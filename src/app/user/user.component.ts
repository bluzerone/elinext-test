import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../shared/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(public router: Router,
              public authService: AuthService) { }

  ngOnInit(): void {
  }

  // При SignOut перенаправляет на home присваивает переменной loginState значение false и присваивает значение пустого массива
  // переменной userData.
  onSignOut(){
    this.router.navigate(['/home']);
    this.authService.loginState = false;
    this.authService.userData = [];
  }

}
