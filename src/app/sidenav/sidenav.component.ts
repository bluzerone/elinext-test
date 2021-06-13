import { MainService } from './../shared/main.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../shared/auth.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(public mainService: MainService,
              public authService: AuthService) { }

  ngOnInit(): void {
  }

}
