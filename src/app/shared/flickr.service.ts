import { FlickrOutput } from './../models/flickr-output';
import { FlickrPhoto } from './../models/flickr-photo';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FlickrService {

  constructor(private http: HttpClient) { }

  // Функция принимающая предварительно обработанный польщовательский вввод и возвращающая коллекцию результатов по запросу.
  search_keyword(keyword: string){
    const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&';
    const params = `api_key=${environment.flickr.key}&text=${keyword}&format=json&nojsoncallback=1&per_page=40`;
    return this.http.get(url+params).pipe(map((res: FlickrOutput) => {
      const urlArray = [];
      res.photos.photo.forEach((photo: FlickrPhoto) => {
        const photoObject = {
          url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
          title: photo.title,
        };
        urlArray.push(photoObject)
      });
      return urlArray;
    }));
  }

}
