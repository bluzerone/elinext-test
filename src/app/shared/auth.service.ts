import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import { BehaviorSubject, fromEvent, merge, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  loginState: boolean = false;
  loginSubject = new BehaviorSubject(false);
  modalState = new BehaviorSubject(false);
  allEvents$ = merge(
    fromEvent(document, 'mousemove'),
    fromEvent(document, 'wheel'),
    fromEvent(document, 'auxclick'),
    fromEvent(document, 'click'),
    fromEvent(document, 'keydown')
  )
  timeoutID: any;
  timeoutModal: any;
  remainigToLogoutCounter: any;
  remainigToLogoutCount: number = 10;
  remainigToLogoutCount$ = of(this.remainigToLogoutCount);
  seconds: number = 0;
  timerIsOn = false;
  idleTime = 0;

  constructor(private firebaseAuth : AngularFireAuth,
              private router: Router) {
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
      this.modalState.next(false);
      this.stopCount();
      clearInterval(this.remainigToLogoutCounter);
      console.log('Logout from auth service');
    });
  }

  initIdle(idleTimeTrigger){
    this.idleTime = idleTimeTrigger;
    this.startCount();
  }


  incrementCount() {
    if (this.seconds >= this.idleTime) {
      this.stopCount();
      this.modalState.next(true);
      this.remainigToLogoutCount = 10;
      if(!this.remainigToLogoutCounter){
        this.remainigToLogoutCounter = setInterval(() => {
          this.remainigToLogoutCount--;
          console.log(this.remainigToLogoutCount);
          this.remainigToLogoutCount === 1 ? clearInterval(this.remainigToLogoutCounter) : false;
        }, 1000)
      }else {
        clearInterval(this.remainigToLogoutCounter);
        this.remainigToLogoutCounter = setInterval(() => {
          this.remainigToLogoutCount--;
          console.log(this.remainigToLogoutCount);
          this.remainigToLogoutCount === 1 ? clearInterval(this.remainigToLogoutCounter) : false;
        }, 1000)
      }
      this.timeoutModal = setTimeout(() => {
        this.logout();

      }, 10000);

    }
    else {
      this.seconds = this.seconds + 1;
      this.timeoutID = setTimeout(() => {
         this.incrementCount();
        }, 1000);
    }
  }

  startCount() {
    if (!this.timerIsOn) {
      this.timerIsOn = true;
      this.incrementCount();
      clearInterval(this.remainigToLogoutCounter);
    }
  }

  resetCount() {
    clearTimeout(this.timeoutID);
    clearTimeout(this.timeoutModal);
    this.seconds = 0;
    this.timerIsOn = false;
    this.startCount();
  }

  stopCount() {
    clearTimeout(this.timeoutID);
    this.timerIsOn = false;
  }

  getSeconds(){
    return this.seconds;
  }

  abortIdleLogout(event: Event){
    event.stopPropagation();
    this.resetCount();
    clearInterval(this.remainigToLogoutCounter);
    this.modalState.next(false);
  }
}
