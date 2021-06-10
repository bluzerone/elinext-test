import { Bookmark } from './../models/bookmark';
import { BaseService } from './../shared/base.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../shared/main.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  urlSubscription: any;
  bookmarksSubscription: Subscription;
  bookmarksList: Bookmark[];
  totalLength: number;
  page: number = 1;

  constructor(public mainService: MainService,
              private route : ActivatedRoute,
              public baseService: BaseService) { }

  ngOnInit(): void {
    this.urlSubscription = this.route.url.subscribe(data => {
      let path: any;
      data.forEach(d => {
      path = d.path;
      });
      this.mainService.sidenavLinks.forEach(links => {
      if(links.link === path){
        links.active = true;
      };
      });
    })
    this.bookmarksSubscription =  this.baseService.getBookmarks().subscribe((res) => {
      this.bookmarksList =  res.map( e =>  {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as Bookmark;
      });
      this.totalLength = this.bookmarksList.length;
      const $session = this.mainService.bnIdle.startWatching(60).subscribe((isTimedOut: boolean) => {
        if (isTimedOut) {
          console.log('session expired');
          $session.unsubscribe();
        }
      });
    });
  }


  ngOnDestroy(): void {
    this.urlSubscription.unsubscribe();
    this.bookmarksSubscription.unsubscribe();
  }

}
