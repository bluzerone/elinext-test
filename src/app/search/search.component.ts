import { Bookmark } from './../models/bookmark';
import { BaseService } from './../shared/base.service';
import { FlickrPhoto } from './../models/flickr-photo';
import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../shared/flickr.service';
import { ActivatedRoute } from '@angular/router';
import { MainService } from './../shared/main.service';
import { TruncateModule } from 'ng2-truncate';



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


  constructor(public flickrService: FlickrService,
     private route : ActivatedRoute,
     public mainService: MainService,
     public baseService: BaseService) { }

  ngOnInit(): void {
  this.urlSubscription = this.route.url.subscribe(data => {
    let path:any;
    data.forEach(d => {
      console.log(d.path);
     path = d.path
    });
    this.mainService.sidenavLinks.forEach(links => {
    if(links.link === path){
      links.active = true
    }
    })
  });
  this.totalLength = this.images.length;
  }

  search(event: any){
    this.searchKeywords = event.target.value.toLowerCase();
    if(this.searchKeywords && this.searchKeywords.length > 0){
      this.flickrService.search_keyword(this.searchKeywords).toPromise()
      .then(res => {
        this.images = res;
        console.log(this.images);

      });
    } else if (this.searchKeywords.length === 0 ){
      this.message = true;
      this.images = [];
    }
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
  }

}
