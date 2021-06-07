import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

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

  constructor() { }
}
