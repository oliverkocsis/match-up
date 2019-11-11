import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { LogsProvider } from '../src/providers/logs/logs';

export class PlatformMock {
  public ready(): Promise<string> {
    return new Promise((resolve) => {
      resolve('READY');
    });
  }

  public getQueryParam() {
    return true;
  }

  public registerBackButtonAction(fn: Function, priority?: number): Function {
    return (() => true);
  }

  public hasFocus(ele: HTMLElement): boolean {
    return true;
  }

  public doc(): HTMLDocument {
    return document;
  }

  public is(): boolean {
    return true;
  }

  public getElementComputedStyle(container: any): any {
    return {
      paddingLeft: '10',
      paddingTop: '10',
      paddingRight: '10',
      paddingBottom: '10',
    };
  }

  public onResize(callback: any) {
    return callback;
  }

  public registerListener(ele: any, eventName: string, callback: any): Function {
    return (() => true);
  }

  public win(): Window {
    return window;
  }

  public raf(callback: any): number {
    return 1;
  }

  public timeout(callback: any, timer: number): any {
    return setTimeout(callback, timer);
  }

  public cancelTimeout(id: any) {
    // do nothing
  }

  public getActiveElement(): any {
    return document['activeElement'];
  }
}

export class StatusBarMock extends StatusBar {
  styleDefault() {
    return;
  }
}

export class SplashScreenMock extends SplashScreen {
  hide() {
    return;
  }
}

export class NavMock {

  public pop(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }

  public push(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }

  public getActive(): any {
    return {
      'instance': {
        'model': 'something',
      },
    };
  }

  public setRoot(): any {
    return true;
  }

  public registerChildNav(nav: any): void {
    return;
  }

}

export class DeepLinkerMock {

}

export class AppVersionMock {
  public getVersionNumber(): any {
    return new Promise(function (resolve: Function): void {
      resolve("0.0.0");
    });
  }
}

export class DeviceMock {
  public uuid = "00000000-0000-0000-0000-000000000000";
  public platform = "mock";
}

export class GoogleAnalyticsMock {
  public startTrackerWithId(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }

  public setUserId(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }


  public setAppVersion(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }
}

export class ThemesProviderMock {
  public init(): any { }
  public ready() {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }
}
export class LogsProviderMock {
  public log(): any { }
}

export class EventsMock {
  public publish(): any { };
  public subscribe(): any { };
}

export class AlertControllerMock {
  public create() {
    return new AlertMock();
  }
}

export class AlertMock {
  public present() { }
}


export const spyGoogleAnalytics: jasmine.SpyObj<GoogleAnalytics> = jasmine.createSpyObj('GoogleAnalytics', ['trackView', 'trackEvent', 'trackException']);

export class SpyObjFactory {
  public static createSpyInAppPurchase(): jasmine.SpyObj<InAppPurchase> {
    const spy: jasmine.SpyObj<InAppPurchase> = jasmine.createSpyObj('InAppPurchase', ['restorePurchases', 'getProducts']);
    spy.getProducts.and.returnValue(new Promise((resolve) => {
      resolve([{
        productId: 'in.app.purchase.mock',
        title: 'InAppPurchaseMock Product',
        description: 'InAppPurchaseMock Description for InAppPurchaseMock Product (in.app.purchase.mock)',
        currency: 'EUR',
        price: 'EUR 0.99',
        priceAsDecimal: 0.99
      }]);
    }));
    spy.restorePurchases.and.returnValue(new Promise((resolve) => {
      resolve([{
        transactionId: '0',
        productId: 'in.app.purchase.mock',
        state: 0,
        date: '2000-01-01'
      }]);
    }));
    return spy;
  }

  public static createSpyEvent(): jasmine.SpyObj<Events> {
    const spy: jasmine.SpyObj<Events> = jasmine.createSpyObj('Events', ['publish', 'subscribe']);
    return spy;
  }

  public static createSpyStorage(): jasmine.SpyObj<Storage> {

    const spy: jasmine.SpyObj<Storage> = jasmine.createSpyObj('Storage', ['set', 'get']);
    spy.get.and.returnValue(new Promise((resolve) => {
      resolve([{
        transactionId: '0',
        productId: 'in.app.purchase.mock',
        state: 0,
        date: '2000-01-01'
      }]);
    }));
    spy.set.and.returnValue(new Promise((resolve) => resolve()));
    return spy
  }
}

export const spyLogs: jasmine.SpyObj<LogsProvider> = jasmine.createSpyObj('LogsProvider', ['log', 'get']);