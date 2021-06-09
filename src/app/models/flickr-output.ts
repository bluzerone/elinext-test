import { FlickrPhoto } from './flickr-photo';

export interface FlickrOutput {
  photos: {
    photo: FlickrPhoto[];
  }
}
