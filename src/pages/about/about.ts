import { Component } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { ContactPage } from './contact/contact';
import { CreditPage } from './credit/credit';
import { PrivacyPolicyPage } from './privacy-policy/privacy-policy';
import { AppVersion } from '@ionic-native/app-version';
import { LogsPage } from './logs/logs';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  public contact: any = ContactPage;
  public credit: any = CreditPage;
  public privacy: any = PrivacyPolicyPage;
  public logs: any = LogsPage;
  public versionCode: string;
  public versionNumber: string;

  constructor(private ga: GoogleAnalytics, private appVersion: AppVersion) { }

  public ionViewDidLoad(): void {
    this.appVersion.getVersionCode().then((v) => this.versionCode = v).catch((e) => console.error(JSON.stringify(e)));
    this.appVersion.getVersionNumber().then((v) => this.versionNumber = v).catch((e) => console.error(JSON.stringify(e)));
  }

  public ionViewDidEnter(): void {
    this.ga.trackView('AboutPage');
  }
}
