import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform, Events, AlertController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { AppVersion } from '@ionic-native/app-version';
import { Device } from '@ionic-native/device';

import { PurchaseComponent } from './purchase';

import {
    EventsMock,
    GoogleAnalyticsMock,
    ThemesProviderMock,
    LogsProviderMock,
    AlertControllerMock
} from '../../../test-config/mocks-ionic';
import { ThemesProvider } from '../../providers/themes/themes';
import { LogsProvider } from '../../providers/logs/logs';

describe('Purchase Component', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PurchaseComponent],
            imports: [
                IonicModule.forRoot(PurchaseComponent)
            ],
            providers: [
                { provide: Events, useClass: EventsMock },
                { provide: AlertController, useClass: AlertControllerMock },
                { provide: GoogleAnalytics, useClass: GoogleAnalyticsMock },
                { provide: ThemesProvider, useClass: ThemesProviderMock },
                { provide: LogsProvider, useClass: LogsProviderMock }
            ]
        })
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PurchaseComponent);
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(component instanceof PurchaseComponent).toBe(true);
    });
});
