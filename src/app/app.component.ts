import { Component, OnInit } from '@angular/core';
import { routeTransitionAnimations } from './route-transition-animations';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeTransitionAnimations]
})
export class AppComponent implements OnInit {

  constructor(){}

  ngOnInit(): void {
  }


  prepareRouteApp(outlet: RouterOutlet) {
    return outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState'];
   }

}
