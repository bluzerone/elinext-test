import {Bookmark} from '../models/bookmark';
import {BaseService} from '../shared/base.service';
import {Component, OnInit} from '@angular/core';
import {MainService} from '../shared/main.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../shared/auth.service';
import {throttleTime} from 'rxjs/operators';


@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  bookmarksSubscription: Subscription;
  bookmarksList: Bookmark[];
  totalLength: number;
  page: number = 1;
  modalState: boolean = true;
  eventsStream$: any;


  constructor(public mainService: MainService,
              public baseService: BaseService,
              public authService: AuthService) { }

  ngOnInit(): void {

    this.mainService.setLinkState('bookmarks');

    // Подписываемся получение массива BookmarksList из BaseService.
    this.bookmarksSubscription =  this.baseService.getBookmarks(this.authService.userData.uid).subscribe((res) => {
      this.bookmarksList =  res.map( e =>  {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as Bookmark;
      });
    // Присваиваем длину массива bookmarksList переменной totalLength.
      this.totalLength = this.bookmarksList.length;
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
    });
  }

  // Функция, возвращает прослушку BehaviorSubject, получая loginState, если loginState = true, то вызывает метод initIdle, в который передается
  // значение таймера. В противном случае вызывается метод stopCount, останавливающий таймер неактивности пользователя.
  getLoginState$(){
    return  this.authService.loginSubject.subscribe((loginState: boolean) => {
      loginState ? this.authService.initIdle(60) : this.authService.stopCount();
    });
  }

  ngOnDestroy(): void {
  //Отписываемся от прослушек
    this.bookmarksSubscription.unsubscribe();
    this.eventsStream$.unsubscribe();
    this.getLoginState$().unsubscribe();
    this.getEventStream$().unsubscribe();
    this.authService.resetCount();
  }

}
