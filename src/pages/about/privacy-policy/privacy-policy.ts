import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-privacy-policy',
  templateUrl: 'privacy-policy.html',
})
export class PrivacyPolicyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public ga: GoogleAnalytics) {
  }

  ionViewDidEnter(): void {
    this.ga.trackView('PrivacyPolicyPage');
  }

}
