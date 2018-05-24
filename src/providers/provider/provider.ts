import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

interface Items {

}
@Injectable()
export class Provider {

  items: Observable<Items[]>; // read collection
  itemsCollection: AngularFirestoreCollection<Items>; //Firestore collection
  requettesProvider: any = [];

  constructor(public db: AngularFirestore) {
    this.itemsCollection = db.collection<Items>('item'); //ref()
    console.log('Hello RequettesProvider Provider');
  }

}
