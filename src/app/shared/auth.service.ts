import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  loginState: boolean = false;


  constructor() { }
}
