import {
    spyGoogleAnalytics,
    SpyObjFactory,
    spyLogs
} from '../../../test-config/mocks-ionic';

import { ThemesProvider } from './themes';
import { Theme } from '../../models/theme';
import { InAppPurchase } from '@ionic-native/in-app-purchase';

const themesMock: Theme[] = [
    new Theme('free', true),
    new Theme('in.app.purchase.mock', false),
];

const imagesMock: any = {
    'free': [
        'assets/free/1.svg',
        'assets/free/2.svg',
        'assets/free/3.svg',
        'assets/free/4.svg',
        'assets/free/5.svg',
        'assets/free/6.svg'
    ],
    'in.app.purchase.mock': [
        'assets/mock/1.svg',
        'assets/mock/2.svg',
        'assets/mock/3.svg',
        'assets/mock/4.svg',
        'assets/mock/5.svg',
        'assets/mock/6.svg'
    ]
}

describe('Theme Provider', () => {
    let provider: ThemesProvider;
    let spyInAppPurchase: jasmine.SpyObj<InAppPurchase>;

    beforeEach(() => {
        spyInAppPurchase = SpyObjFactory.createSpyInAppPurchase();
        provider = new ThemesProvider(spyGoogleAnalytics, spyInAppPurchase, spyLogs);
    });

    it('should initalize immediatelly', () => {
        provider.init(themesMock, imagesMock);
        expect(provider.themes.length).toBe(2);
        expect(provider.themes[0].name).toBe(themesMock[0].name);
        expect(provider.themes[1].name).toBe(themesMock[1].name);
    });

    it('should get products from app store', (done) => {
        provider.init(themesMock, imagesMock);
        const index = 1;
        const price = 'EUR 0.99'
        spyInAppPurchase.getProducts.and.returnValue(new Promise((resolve) => {
            resolve([{
                productId: themesMock[index].name,
                title: 'InAppPurchaseMock Product',
                description: 'InAppPurchaseMock Description for InAppPurchaseMock Product (in.app.purchase.mock)',
                currency: 'EUR',
                price: price,
                priceAsDecimal: 0.99
            }]);
        }));
        provider.ready()
            .then((themes: Theme[]) => {
                expect(themes[index].name).toBe(themesMock[index].name);
                expect(themes[index].price).toBe(price);
                expect(provider.themes[index].name).toBe(themesMock[index].name);
                expect(provider.themes[index].price).toBe(price);
                done();
            })
            .catch((error) => {
                done.fail(error)
            });
    });

    it('should restore purchases', (done) => {
        provider.init(themesMock, imagesMock);
        const index = 1;
        spyInAppPurchase.restorePurchases.and.returnValue(new Promise((resolve) => {
            resolve([{
                transactionId: '0',
                productId: themesMock[index].name,
                state: 0,
                date: '2000-01-01'
            }]);
        }));
        provider.ready()
            .then((themes: Theme[]) => {
                expect(themes[index].name).toBe(themesMock[index].name);
                expect(themes[index].purchased).toBeTruthy();
                expect(provider.themes[index].name).toBe(themesMock[index].name);
                expect(provider.themes[index].purchased).toBeTruthy();
                done();
            })
            .catch((error) => {
                done.fail(error)
            });
    });
});
