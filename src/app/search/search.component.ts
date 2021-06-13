import { AuthService } from './../shared/auth.service';
import { Bookmark } from './../models/bookmark';
import { BaseService } from './../shared/base.service';
import { FlickrPhoto } from './../models/flickr-photo';
import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../shared/flickr.service';
import { MainService } from './../shared/main.service';
import { Subject } from 'rxjs';

import { AngularFireAuth } from "@angular/fire/auth";
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';



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
    });
  }

  getPhotos(value: any){
    // Передаём, заделэенный инпут пользователя, подписываемся и получаем массив результата запроса, присваиваем результат переменной images.
    this.flickrService.search_keyword(value).subscribe(data => {
      this.images = data;
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
  }

}
