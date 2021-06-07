import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlickrService {

  public searchText: String = ''

  constructor() { }
}
