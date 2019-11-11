import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-credit',
  templateUrl: 'credit.html',
})
export class CreditPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public ga: GoogleAnalytics) {
  }

  ionViewDidEnter(): void {
    this.ga.trackView('CreditPage');
  }

}
