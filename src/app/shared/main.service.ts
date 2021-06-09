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
      name: 'cloud',
      active: false,
      link: 'search'
    },
    {
      id: 2,
      name: 'bookmark',
      active: false,
      link: 'bookmarks'
    }
  ]

  constructor(private _snackBar: MatSnackBar) { }

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
}
