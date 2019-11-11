import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { AppVersion } from '@ionic-native/app-version';
import { Device } from '@ionic-native/device';

import { MyApp } from './app.component';
import {
    PlatformMock,
    StatusBarMock,
    SplashScreenMock,
    GoogleAnalyticsMock,
    AppVersionMock,
    DeviceMock,
    ThemesProviderMock,
    LogsProviderMock
} from '../../test-config/mocks-ionic';
import { ThemesProvider } from '../providers/themes/themes';
import { LogsProvider } from '../providers/logs/logs';

describe('MyApp Component', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyApp],
            imports: [
                IonicModule.forRoot(MyApp)
            ],
            providers: [
                { provide: Platform, useClass: PlatformMock },
                { provide: StatusBar, useClass: StatusBarMock },
                { provide: SplashScreen, useClass: SplashScreenMock },
                { provide: GoogleAnalytics, useClass: GoogleAnalyticsMock },
                { provide: AppVersion, useClass: AppVersionMock },
                { provide: Device, useClass: DeviceMock },
                { provide: ThemesProvider, useClass: ThemesProviderMock },
                { provide: LogsProvider, useClass: LogsProviderMock }
            ]
        })
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MyApp);
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(component instanceof MyApp).toBe(true);
    });
});
