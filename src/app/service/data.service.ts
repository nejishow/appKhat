import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  itemCols: AngularFirestoreCollection<any[]>;
  consumption: Observable<any[]>;
  itemDoc: AngularFirestoreDocument<any[]>;
  item: Observable<any>;
  items: Observable<any>;
  constructor(private db: AngularFirestore) {
  }
  getItems() {
    this.itemCols = this.db.collection('usersExp2');
    this.items = this.itemCols.valueChanges();
    return this.items;
  }
  getItem(id) {
    this.itemDoc = this.db.doc('usersExp2/' + id);
    this.item = this.itemDoc.valueChanges();
    return this.item;

  }
  getConsumption(id) {
    this.consumption = this.db.collection('usersExp2').doc(id)
      .collection("consumption").valueChanges();
    return this.consumption;
  }
}
