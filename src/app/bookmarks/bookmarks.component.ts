import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../shared/main.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  urlSubscription: any;

  constructor(public mainService: MainService, private route : ActivatedRoute) { }

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
    })
  }

  ngOnDestroy(): void {
    this.urlSubscription.unsubscribe();
  }

}
