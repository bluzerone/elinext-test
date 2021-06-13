import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MainService } from './../shared/main.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../shared/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  navigationSubscription: Subscription;

  constructor(public mainService: MainService,
              public router: Router,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.mainService.setLinkState('home');
  }

  ngOnDestroy(): void {
    this.mainService.resetLinksState();
  }

}
