import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { DetailsPage } from "../../pages/details/details"
import { AuthPage } from "../../pages/auth/auth"
import { AuthProvider } from "../../providers/auth/auth"
import firebase from "firebase"

interface Items {

}
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  itemsCollection: AngularFirestoreCollection<Items>; //Firestore collection
  items: Observable<Items[]>; // read collection
  isOnline: Boolean = false

  constructor(public navCtrl: NavController, db: AngularFirestore, public authServc: AuthProvider) {
    this.UserIsOnline()
    this.itemsCollection = db.collection<Items>('concerts'); //ref()

    this.items = this.itemsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Items;
        const id = a.payload.doc.id;
        /*affichage de l'id du document*/
        console.log(a.payload.doc.id)
        console.log("test" + a.payload.doc.data())
        return { id, ...data };
      })
    })
  }

  ionViewDidLoad() {
    this.UserIsOnline()
    console.log("did load " + this.isOnline)
  }

  ionViewDidEnter() {
    this.UserIsOnline()
    console.log("did enter " + this.isOnline)
  }

  UserIsOnline() {
    if (firebase.auth().currentUser != null) {
      this.isOnline = true
    } else {
      this.isOnline = false
    }
  }


  itemSelected(item) {
    this.navCtrl.push(DetailsPage, { item })
  }

  goToLogin() {
    this.navCtrl.push(AuthPage)
  }
}