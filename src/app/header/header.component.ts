import { Component, OnInit } from '@angular/core';
import { AuthService } from './../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  //Импортируем AuthService для динамического отобращение кнопок в View.
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
