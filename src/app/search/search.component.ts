import { AuthService } from '../shared/auth.service';
import { Bookmark } from '../models/bookmark';
import { BaseService } from '../shared/base.service';
import { FlickrPhoto } from '../models/flickr-photo';
import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../shared/flickr.service';
import { MainService } from '../shared/main.service';
import {Subject, throwError} from 'rxjs';

import { AngularFireAuth } from "@angular/fire/auth";
import { debounceTime, distinctUntilChanged, throttleTime } from 'rxjs/operators';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  urlSubscription: any;
  images: FlickrPhoto[] = [];
  searchKeywords: string = '';
  message:boolean = false;
  totalLength: number;
  page: number = 1;
  subjectKeyUp = new Subject<any>();
  eventsStream$: any;
  modalState: Boolean;

  constructor(public flickrService: FlickrService,
              public mainService: MainService,
              public baseService: BaseService,
              public afAuth: AngularFireAuth,
              public authService: AuthService) {}

  ngOnInit(): void {
    this.mainService.setLinkState('search');

    // Слушаем события из subjectKeyup, используя методы debounceTime(Для создания задержки ввода и предотвращения излишней нагрузки)
    // и distinctUntilChange чтобы предотвратить отправку повторяющихся запросов.
    // Вызываем функцую getPhotos, передавая туда value.
    this.subjectKeyUp.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
      this.getPhotos(value);
    },error => {
      throwError(error);
    });

    this.getLoginState$();
    this.getEventStream$();

    this.authService.modalState.subscribe(state => {
      this.modalState = state;
    });
  }

  // Функция, возвращает прослушку событий на document, при событиях обнуляет таймер.
   getEventStream$() {
    return this.eventsStream$ = this.authService.allEvents$.pipe(throttleTime(1000)).subscribe((event: Event) => {
      let modal = this.modalState;
      modal ? false : this.authService.resetCount();
    },error => {
      throwError(error);
    });
  }

  // Функция, возвращает прослушку BehaviorSubject, получая loginState, если loginState = true, то вызывает метод initIdle, в который передается
  // значение таймера. В противном случае вызывается метод stopCount, останавливающий таймер неактивности пользователя.
  getLoginState$(){
    return  this.authService.loginSubject.subscribe((loginState: boolean) => {
      loginState ? this.authService.initIdle(60) : this.authService.stopCount();
    },error => {
      throwError(error);
    });
  }

  // Передаём, заделэенный инпут пользователя, подписываемся и получаем массив результата запроса, присваиваем результат переменной images.
  getPhotos(value: any){
    this.flickrService.search_keyword(value).subscribe(data => {
      this.images = data;
    },error => {
      throwError(error);
    })
  }

  // Функция, вызываемая при keyup на инпуте пользователя, предназначенного для поискового запроса. Принимает event.
  onSearch(event: any){
    // Вызываем метод next() у переменной subjectKeyUp, являющейся экземпляром Subject и передаём в next() значение пользовательского ввода.
    const value = event.target.value;
    this.subjectKeyUp.next(value);
  }

  //Функция, вызываемая при нажатии на кнопку "Add to bookmarks", принимает строковые значения сохраняемого обьекта.
  createBookmarkObj(url, title){
    const bookmark: Bookmark = {
      // К полученным данных добавялем uid пользователя, авторизированного в момент сохранения, для последующей персонализации запроса,
      // возвращающего массив bookmarksList
      uid: this.authService.userData.uid,
      url,
      title
    };
    // Передаём созданный обьект.
    this.baseService.setBookmark(bookmark);
    this.mainService.openSnackBar('photo has been successfully bookmarked!', "right", "bottom", "success-dialog-red");
  }

  ngOnDestroy(): void {
    // Отписываемся от событий.
    this.subjectKeyUp.unsubscribe();
    this.mainService.resetLinksState();
    this.eventsStream$.unsubscribe();
    this.getLoginState$().unsubscribe();
    this.getEventStream$().unsubscribe();
    this.authService.resetCount();
  }

}
