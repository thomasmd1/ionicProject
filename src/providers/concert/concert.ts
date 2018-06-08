import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/abstract_emitter';

interface Items {

}
/*
  Generated class for the ConcertProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConcertProvider {

  itemsCollection: AngularFirestoreCollection<Items>; //Firestore collection
  items: Observable<Items[]>; // read collection
  constructor(db: AngularFirestore) {
    this.itemsCollection = db.collection<Items>('concerts');
  }

  delete(id) {
    console.log(id)
    this.itemsCollection.doc(id).delete();
  }

  add(city,date,lat,lon,name,url_image){
    this.itemsCollection.doc(Date.now().toString()).set({
      city: city,
      date: date,
      lat: lat,
      lon: lon,
      name: name,
      url_image: url_image
    })
    .then(success => console.log(success))
    .catch(err => console.log(err))
  }

}
