import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { GameProvider } from '../../../providers/game/game';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { HomePage } from '../../home/home';

@Component({
  selector: 'page-win',
  templateUrl: 'win.html',
})
export class WinPage {
  public width: number;
  public height: number;
  public theme: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
    public gameProvider: GameProvider, public ga: GoogleAnalytics
  ) {
    this.width = this.navParams.get("width");
    this.height = this.navParams.get("height");
    this.theme = this.navParams.get("theme");
  }

  ionViewDidEnter(): void {
    this.ga.trackView('WinPage');
  }

  onHome() {
    this.navCtrl.setRoot(HomePage);
  }

  onRefresh() {
    this.gameProvider.initialize(this.width, this.height, this.theme);
    this.viewCtrl.dismiss();
  }

}
