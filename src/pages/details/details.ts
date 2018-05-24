import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  itemName: String

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.itemName = navParams.data.item.item
    console.log(navParams.data.item.item)
  }
}
