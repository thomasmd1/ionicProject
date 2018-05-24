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

  city: String
  date: String
  name: String
  image: String

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let concert = navParams.data.item
    console.log(concert.name)
    this.city = concert.city
    this.date = concert.date
    this.name = concert.name
    this.image = concert.url_image
  }
}
