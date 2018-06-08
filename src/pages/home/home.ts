import { Component } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { DetailsPage } from "../../pages/details/details"
import { AuthPage } from "../../pages/auth/auth"
import { AuthProvider } from "../../providers/auth/auth"
import firebase from "firebase"
import { AddPage } from '../add/add';


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

  constructor(public navCtrl: NavController, db: AngularFirestore, public authServc: AuthProvider,private alertCtrl: AlertController) {
    this.UserIsOnline()
    this.itemsCollection = db.collection<Items>('concerts'); //ref()

    this.items = this.itemsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Items;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    })
  }

  ionViewDidLoad() {
    this.UserIsOnline()
  }

  ionViewDidEnter() {
    this.UserIsOnline()
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
    console.log(item)
  }

  addItem(){
    this.navCtrl.push(AddPage)
  }

  goToLogin() {
    this.navCtrl.push(AuthPage)
  }

  logout() {
    this.authServc.logoutUser().then(cb => { this.isOnline = false })
  }
}