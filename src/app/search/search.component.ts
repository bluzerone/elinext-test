import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../shared/flickr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from './../shared/main.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  urlSubscription: any;

  constructor(public flickrService: FlickrService,
     private route : ActivatedRoute,
     public mainService: MainService) { }

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
