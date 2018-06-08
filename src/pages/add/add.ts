import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController} from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ConcertProvider } from "../../providers/concert/concert"
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


  constructor(public navCtrl: NavController,public view:ViewController, public navParams: NavParams, public alertCtrl: AlertController, public provider: ConcertProvider){
    
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
            this.provider.add(city,date,lat,lon,name,url_image)
            // this.navCtrl.push(HomePage)
            this.view.dismiss()
          }
        }
        
      ]
    });
    confirm.present();
  }

}
