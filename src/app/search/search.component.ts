import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Bookmark } from './../models/bookmark';
import { BaseService } from './../shared/base.service';
import { FlickrPhoto } from './../models/flickr-photo';
import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../shared/flickr.service';
import { ActivatedRoute } from '@angular/router';
import { MainService } from './../shared/main.service';
import { Subject } from 'rxjs';



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
  subjectKeyUp = new Subject<any>()


  constructor(public flickrService: FlickrService,
     private route : ActivatedRoute,
     public mainService: MainService,
     public baseService: BaseService) {

     }


  ngOnInit(): void {
  this.urlSubscription = this.route.url.subscribe(data => {
    let path:any;
    data.forEach(d => {
     path = d.path;
    });
    this.mainService.sidenavLinks.forEach(links => {
    if(links.link === path){
      links.active = true
    }
    });
  });
  this.totalLength = this.images.length;
  this.subjectKeyUp.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
    this.getPhotos(value);
  });
  const $session = this.mainService.bnIdle.startWatching(60).subscribe((isTimedOut: boolean) => {
    if (isTimedOut) {
      console.log('session expired');
      $session.unsubscribe();
    }
  });
  }

  onSearch(event: any){
    const value = event.target.value
    this.subjectKeyUp.next(value);
  }

  getPhotos(value: any){
  this.flickrService.search_keyword(value).subscribe(data => {
    this.images = data;
  })
  }

  createBookmarkObj(url, title){
    const bookmark: Bookmark = {
      url,
      title
    };
    this.baseService.setBookmark(bookmark);
    this.mainService.openSnackBar('photo has been successfully bookmarked!', "right", "bottom", "success-dialog-red");
  }

  ngOnDestroy(): void {
    this.urlSubscription.unsubscribe();
    this.subjectKeyUp.unsubscribe();
  }

}
