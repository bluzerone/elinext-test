import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService,
              public router: Router) { }

  ngOnInit(): void {
  }

  // Метод, принимающий обьект User при авторизации пользователя. Создаёт в localStorage обьект user, перенаправляет на home.
  // Присваивает State true переменной loginState. Пробрасываем в метод next() у BehaviorSubject значение true.
  onSignin(event){
    localStorage.setItem('user', event)
    this.router.navigate(['home']);
    this.authService.loginSubject.next(true);
  }

}
