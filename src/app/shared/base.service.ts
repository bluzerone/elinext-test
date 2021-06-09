import { MainService } from './main.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(public afs: AngularFirestore,
              private mainService: MainService) { }

  getBookmarks(){
    return this.afs.collection('bookmarks').snapshotChanges();
  }

  setBookmark(data) {
    this.afs.collection("bookmarks").add(data)
  }


  deleteBookmark(id) {
    let photoId: string;
    this.afs.collection('bookmarks').snapshotChanges().subscribe(data => {
      data.map(e => {
        photoId = e.payload.doc.id

      })
    });
    const deleteUserSubs = this.afs.collection('bookmarks').doc(id).delete();
    this.mainService.openSnackBar('photo successfully deleted!', "right", "bottom", "success-dialog-red")
  }

}
