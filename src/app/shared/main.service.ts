import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  horizontalPosition: MatSnackBarHorizontalPosition;
  verticalPosition: MatSnackBarVerticalPosition;

  public sidenavLinks: any[] = [
    {
      id: 1,
      name: 'home',
      active: false,
      link: 'home'
    },
    {
      id: 2,
      name: 'cloud',
      active: false,
      link: 'search'
    },
    {
      id: 3,
      name: 'bookmark',
      active: false,
      link: 'bookmarks'
    }
  ]

  constructor(private _snackBar: MatSnackBar) { }

  // Функция открытия matSnackBar, принмающая отображаемое сообщение, гооризонтальную и вертикальную позиции.
  openSnackBar(message: string, horizont?: any, vertical?: any, classBar?: string) {
    horizont ? this.horizontalPosition = horizont : this.horizontalPosition = 'center'
    vertical ? this.verticalPosition = vertical : this.verticalPosition = 'top'
    this._snackBar.open(message,
      'close', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: classBar
    });
  }

  // Сбрасывает State ссылок в Sidenav
  resetLinksState(){
    this.sidenavLinks.forEach(link => {
      link.active = false;
    })
  }

  // Устанавливает активный State ссылке на компонент, название которого передано в функцию.
  setLinkState(comp){
    this.sidenavLinks.forEach(link => {
      link.link === comp ? link.active = true : link.active = false;
    });
  }

  setActiveClass(id){
    this.sidenavLinks.forEach((item) => {
      if(item.id == id){
        item.active = true;
      } else {
        item.active = false;
      }
    })
  }
}
