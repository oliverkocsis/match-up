import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { Theme } from '../../models/theme';
import { Product } from '../../models/product';
import { Purchase } from '../../models/purchase';
import { LogsProvider } from '../logs/logs';

@Injectable()
export class ThemesProvider {

  public themes: Theme[];
  public selected: Theme;
  private proudcts_array: string[] = [];
  private products_map: any = {};
  private images: any;
  private purchases: Purchase[];


  constructor(private platform: Platform, private iap: InAppPurchase, private logProvider: LogsProvider) { }


  /**
   * Initializes the Themes Provider. Call after platform is ready. 
   * @param themes 
   * @param images 
   */
  public init(themes: Theme[], images: any): void {
    /* Set Default Themes and Images */
    this.themes = themes;
    this.images = images;
    this.proudcts_array = [];
    this.products_map = {};

    for (let index = 0; index < themes.length; index++) {
      const theme = themes[index];
      this.proudcts_array.push(theme.name);
      this.products_map[theme.name] = index;
    }

    this.selected = this.themes[0];
  }

  public ready(): Promise<Theme[]> {
    return this.getInAppProducts().then((data) => {
      if (this.platform.is('android')) {
        return this.restoreInAppPurchases();
      } else {
        return data;
      }
    }).catch((error) => {
      switch (error) {
        case 'cordova_not_available':
          return this.themes;
        default:
          throw error;
      }
    });
  }

  public select(index: number): void {
    this.selected = this.themes[index];
  }

  public getImages(theme: string): string[] {
    return this.images[theme];
  }

  public getThemeByName(name: string): Theme {
    return this.themes[this.products_map[name]];
  }

  public getInAppProducts(): Promise<Theme[]> {
    return this.iap.getProducts(this.proudcts_array).then((products: Product[]) => {
      const msg = `[ca1f9ed38056] this.iap.getProducts: ${JSON.stringify(products)}`;
      console.debug(msg);
      this.logProvider.log(msg);
      for (const _product of products) {
        const theme = this.themes[this.products_map[_product.productId]]
        theme.price = _product.price;
        theme.priceAsDecimal = _product.priceAsDecimal;
        theme.currency = _product.currency;
        theme.title = _product.title;
      }
      return this.themes;
    });
  }

  public restoreInAppPurchases(): Promise<Theme[]> {
    return this.iap.restorePurchases().then((purchases: Purchase[]) => {
      const msg = `[8de58c608617] this.iap.restorePurchases(): ${JSON.stringify(purchases)}`;
      console.debug(msg);
      this.logProvider.log(msg);
      if (purchases) {
        this.purchases
        for (const purchase of purchases) {
          this.themes[this.products_map[purchase.productId]].purchased = true;
        }
      }
      this.purchases = purchases;
      return this.themes;
    });
  }

  public purchaseInApp(productId: string): Promise<Purchase> {
    return this.iap.buy(productId).then((purchase: any) => {
      const msg = `[ab5ced79608f] this.iap.buy(${productId}): ${JSON.stringify(purchase)}`;
      console.debug(msg);
      this.logProvider.log(msg);
      this.themes[this.products_map[purchase.productId]].purchased = true;
      return purchase;
    });
  }
}
