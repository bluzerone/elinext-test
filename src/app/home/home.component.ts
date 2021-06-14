import { Subscription, Observable } from 'rxjs';
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

  $loginSubject: Observable<Boolean>;
  loginState: Boolean;

  constructor(public mainService: MainService,
              public router: Router,
              public authService: AuthService) { }

  //При инициализации страницы присваиваем переменной loginSubject Observable<Boolean>, возвращенный BehaviorSubject<boolean>.
  ngOnInit(): void {
    this.mainService.setLinkState('home');
    this.$loginSubject = this.authService.loginSubject
  }

  ngOnDestroy(): void {
    this.mainService.resetLinksState();
  }

}
