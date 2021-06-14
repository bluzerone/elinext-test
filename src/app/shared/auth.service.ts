import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  loginState: boolean = false;
  loginSubject = new BehaviorSubject(false);

  constructor(public firebaseAuth : AngularFireAuth,
              public router: Router,
              public ngZone: NgZone) {
    // Подписываемся на изменения статуса пользователя в firebaseAuth. Если подписка возвразает нам объект user, то присваиваем его
    // переменной userData, меняем значение переменной loginState на true, пробрасываем в метод next() у BehaviorSubject значение true,
    // создаём запись в localStorage под ключём user.
    // Если подписка не возвращает нам обьект user, то удаляем их  localStorage запись user, пробрасываем в метод next() у
    // BehaviorSubject значение false.
    this.firebaseAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        this.loginState = true;
        this.loginSubject.next(true);
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.removeItem('user');
        this.loginSubject.next(false);
      };
    });
  }

  // Функция, вызывающая метод деавторизации пользователя, в случае reject удаляющий из localStorage обьект user, перенаправляющего
  // на home, меняющего значение переменной loginState на false и пробрасывающий в метод next() у BehaviorSubject значение false.
  logout(){
      this.firebaseAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['home']);
      this.loginSubject.next(false);
      this.loginState = false;
    });
  }


}
