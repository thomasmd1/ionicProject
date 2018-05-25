import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

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
  lat: String
  long: String

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let concert = navParams.data.item
    console.log(concert.name)
    this.city = concert.city
    this.date = concert.date
    this.name = concert.name
    this.image = concert.url_image
    this.lat = concert.lat
    this.long = concert.lon
  }

  ionViewDidLoad() {
    this.initMap(this.lat, this.long);
  }

  initMap(lat, long) {
    console.log(lat)
    console.log(long)
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: { lat: parseFloat(lat), lng: parseFloat(long) }
    });

    var marker = new google.maps.Marker({
      position: { lat: parseFloat(lat), lng: parseFloat(long) },
      map: this.map,
      title: this.name
    });

    this.directionsDisplay.setMap(this.map);
  }
}
