import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public ga: GoogleAnalytics) {
  }

  ionViewDidEnter(): void {
    this.ga.trackView('ContactPage');
  }

}
