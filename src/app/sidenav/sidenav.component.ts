import { MainService } from './../shared/main.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(public mainService: MainService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    // console.log(this.route.url.subscribe(data => {
    //   console.log(data);

    // }))
  }

  setActiveClass(id){
    this.mainService.sidenavLinks.forEach((item) => {
      if(item.id == id){
        item.active = true;
      } else {
        item.active = false;
      }
    })
  }

}
