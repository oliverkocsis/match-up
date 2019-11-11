import { Component, enableProdMode } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { AppVersion } from '@ionic-native/app-version';
import { Device } from '@ionic-native/device';

import { HomePage } from '../pages/home/home';
import { ThemesProvider } from '../providers/themes/themes';
import { themes, images } from '../assets/themes';
import { LogsProvider } from '../providers/logs/logs';
import { Theme } from '../models/theme';

enableProdMode();

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, ga: GoogleAnalytics, appVersion: AppVersion, device: Device, themesProvider: ThemesProvider, logs: LogsProvider) {
    themesProvider.init(themes, images);
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      console.log(`[9d0968f91a14] device.uuid: ${device.uuid}`);
      console.log(`[9d0968f91a14] device.platform: ${device.platform}`);

      /* Start Google Analytics */
      ga.startTrackerWithId('UA-120644008-1')
        .then(() => {
          console.log('[9d41581149c4] google analytics is ready');
          ga.setUserId(device.uuid);
          return appVersion.getVersionNumber();
        })
        .then((version: string) => {
          console.log(`[f7e078861051] appVersion: ${version}`);
          ga.setAppVersion(version);
        }).catch((error) => {
          console.warn(`[0f7aadbcdf15] ga.startTrackerWithId('UA-120644008-1'): ${JSON.stringify(error)}`)
        });

      /* Init Themes Provider */
      themesProvider.ready()
        .then((_themes: Theme[]) => {
          console.log(`[9390be9164bd]  themesProvider.ready(): ${JSON.stringify(_themes)}`)
        })
        .catch(e => {
          const msg = `[ca46c41aa41a]  themesProvider.ready(): ${JSON.stringify(e)}`;
          console.error(msg);
          ga.trackException(msg, false);
          logs.log(msg);
        });
    });
  }
}

