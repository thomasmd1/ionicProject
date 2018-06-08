import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import firebase from "firebase"

/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
interface Items {

}
@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  itemsCollection: AngularFirestoreCollection<Items>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public db: AngularFirestore){
    this.itemsCollection = db.collection<Items>('concerts'); //ref()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

  addConcert(city,date,lat,lon,name,url_image){
    let confirm = this.alertCtrl.create({
      title: "Valider l'ajout du concert ?",
      message: "",
      buttons: [
        {
          text: "Non 👎🏻",
          handler: () => {
            console.log("Pas OK");
          }
        },
        {
          text: "Oui 👍🏻",
          handler: () => {
            console.log("OK");
            this.itemsCollection.doc("pd").set({
              city: city,
              date: date,
              lat: lat,
              lon: lon,
              name: name,
              url_image: url_image
            })
            .then(pd => console.log(pd))
            .catch(pd => console.log(pd))
            this.navCtrl.push(HomePage)
          }
        }
        
      ]
    });
    confirm.present();
  }

}
