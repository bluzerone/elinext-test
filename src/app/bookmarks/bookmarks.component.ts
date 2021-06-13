import { Bookmark } from './../models/bookmark';
import { BaseService } from './../shared/base.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../shared/main.service';
import { Subscription } from 'rxjs';
import { AuthService } from './../shared/auth.service';


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


  constructor(public mainService: MainService,
              private route : ActivatedRoute,
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
  }

  ngOnDestroy(): void {
  //Отписываемся от изменений из BAseService.
    this.bookmarksSubscription.unsubscribe();
  }

}
