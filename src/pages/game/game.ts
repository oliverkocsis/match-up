import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, ModalController } from 'ionic-angular';
import { GameProvider } from '../../providers/game/game';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { WinPage } from './win/win';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  @ViewChild(Content) content: Content;
  public width: number;
  public height: number;
  public theme: string;
  public win: boolean = false;
  public maxWidth: number;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
    public gameProvider: GameProvider, public ga: GoogleAnalytics
  ) { }

  ionViewDidEnter(): void {
    this.ga.trackView('GamePage');
    this.gameProvider.initialize(this.width, this.height, this.theme);
  }

  ionViewWillEnter(): void {
    console.log(`[b29cbb5cd986] ionViewDidLoad GamePage width * height: ${this.width} * ${this.height}`);
    this.width = this.navParams.get("width");
    this.height = this.navParams.get("height");
    this.theme = this.navParams.get("theme");
    this.ga.trackEvent("Theme", this.theme);
    this.ga.trackEvent("Level", `${this.width} * ${this.height}`);
    this.maxWidth = Math.floor((this.content.contentHeight - 100) / this.height * this.width); // height of navbar is 44 px on android and 64 on ios;
  }

  ionViewDidLeave(): void {
    this.gameProvider.clear();
  }

  public refresh() {
    console.log(`[3ef606b10d1f] refresh: {this.width} * ${this.height}`)
    this.ga.trackEvent("Game", "refresh", `${this.width} * ${this.height}`);
    this.ga.trackEvent("Level", `${this.width} * ${this.height}`);
    this.win = false;
    this.gameProvider.initialize(this.width, this.height, this.theme);
  }

  onWin(event): void {
    console.log(`[657b7808bb94] win: ${event}`);
    this.ga.trackEvent("Game", "win", `${this.width} * ${this.height}`);
    const profileModal = this.modalCtrl.create(WinPage, { width: this.width, height: this.height, theme: this.theme });
    setTimeout(() => profileModal.present(), 500);
  }
}
