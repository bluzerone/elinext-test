import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  loginState: boolean = false;

  constructor(public firebaseAuth : AngularFireAuth,
              public router: Router,
              public ngZone: NgZone) {
    // Подписываемся на изменения статуса пользователя в firebaseAuth. Если подписка возвразает нам объект user, то присваиваем его
    // переменной userData, меняем значение переменной loginState на true и создаём запись в localStorage под ключём user.
    // Если подписка не возвращает нам обьект user, то удаляем их  localStorage запись user.
    this.firebaseAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        this.loginState = true;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.removeItem('user');
      };
    });
  }

  // Функция, вызывающая метод деавторизации пользователя, в случае reject удаляющего из localStorage обьект user, перенаправляющего
  // на home и меняющего значение переменной loginState на false.
  logout(){
      this.firebaseAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['home']);
      this.loginState = false;
    });
  }


}
