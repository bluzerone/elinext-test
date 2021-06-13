import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth){}

  //Получаем статус авторизации пользователя и возвращаем true(Если пользователь авторизирован) и false(Если не авторизирован).
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Promise<boolean | UrlTree> {
    const user = this.afAuth.currentUser;
     const isAuthenticated = user ? true : false;
    if(!isAuthenticated){
      alert('USER NOT AUTHNTICATED');
    }
    return isAuthenticated;
  }


}
