import { MainService } from './main.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private afs: AngularFirestore,
              private mainService: MainService) { }

  // Функция, возвращающая Observable на коллекцию Bookmar[], содержащую обьекты, сохранные пользователем авторизированным в данный момент.
  getBookmarks(uid){
    return this.afs.collection('bookmarks', ref => ref.where('uid', '==', uid)).snapshotChanges();
  }

  // Добавляет в коллеккция bookmarks новый обьект.
  setBookmark(data) {
     this.afs.collection("bookmarks").add(data);
  }

  // Принимает uid пользователя и id документа firestoreDB, передавая их метод, удаляющий запись из firestoreDB, где автор сохраненной
  // записи в данный момент авторизированный пользователь.
  deleteBookmark(uid, id) {
    const deleteUserSubs = this.afs.collection('bookmarks', ref => ref.where('uid', '==', uid)).doc(id).delete();
    this.mainService.openSnackBar('photo successfully deleted!', "right", "bottom", "success-dialog-red")
  }

}
