import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  $loginSubject: Observable<Boolean>;
  loginState: Boolean;

  //Импортируем AuthService для динамического отобращение кнопок в View.
  constructor(public authService: AuthService) { }

  //При инициализации страницы присваиваем переменной loginSubject Observable<Boolean>, возвращенный BehaviorSubject<boolean>.
  ngOnInit(): void {
    this.$loginSubject = this.authService.loginSubject;
  }

}
