import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { AppVersion } from '@ionic-native/app-version';
import { Device } from '@ionic-native/device';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ComponentsModule } from '../components/components.module';
import { AboutPage } from '../pages/about/about';
import { ThemesProvider } from '../providers/themes/themes';
import { GameProvider } from '../providers/game/game';
import { GamePage } from '../pages/game/game';
import { ContactPage } from '../pages/about/contact/contact';
import { CreditPage } from '../pages/about/credit/credit';
import { PrivacyPolicyPage } from '../pages/about/privacy-policy/privacy-policy';
import { WinPage } from '../pages/game/win/win';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { LogsProvider } from '../providers/logs/logs';
import { LogsPage } from '../pages/about/logs/logs';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    GamePage,
    WinPage,
    ContactPage,
    CreditPage,
    PrivacyPolicyPage,
    LogsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    GamePage,
    WinPage,
    ContactPage,
    CreditPage,
    PrivacyPolicyPage,
    LogsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ThemesProvider,
    GameProvider,
    GoogleAnalytics,
    AppVersion,
    Device,
    InAppPurchase,
    LogsProvider
  ]
})
export class AppModule { }
