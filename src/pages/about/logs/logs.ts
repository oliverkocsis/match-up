import { Component } from '@angular/core';
import { LogsProvider } from '../../../providers/logs/logs';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-logs',
  templateUrl: 'logs.html',
})
export class LogsPage {

  public logs: string[] = [];

  constructor(private ga: GoogleAnalytics, private logsProvider: LogsProvider) { }

  ionViewDidEnter(): void {
    this.ga.trackView('LogsPage');
    this.logs = this.logsProvider.get();
  }
}
