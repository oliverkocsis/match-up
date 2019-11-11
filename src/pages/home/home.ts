import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { ThemesProvider } from '../../providers/themes/themes';
import { AboutPage } from '../about/about';
import { GamePage } from '../game/game';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public about: any = AboutPage;
  public game: any = GamePage;

  constructor(private navCtrl: NavController, private ga: GoogleAnalytics, public themesProvider: ThemesProvider) { }

  ionViewDidEnter(): void {
    this.ga.trackView('HomePage');
  }

  onSelectLevel(dim: number[]) {
    console.log(`[c238b2bebcef] dimensions: ${JSON.stringify(dim)}`);
    const width = dim[0];
    const height = dim[1];
    const theme = this.themesProvider.selected.name;
    this.navCtrl.push(this.game, { width: width, height: height, theme: theme });
  }
}
