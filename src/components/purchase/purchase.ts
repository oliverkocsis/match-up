import { Component } from '@angular/core';
import { AlertController, ToastController, Platform } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { ThemesProvider } from '../../providers/themes/themes';
import { Purchase } from '../../models/purchase';

@Component({
  selector: 'purchase',
  templateUrl: 'purchase.html'
})
export class PurchaseComponent {

  public expected: number;

  constructor(private platform: Platform, private alertCtrl: AlertController, private toastCtrl: ToastController, private ga: GoogleAnalytics, private themesProvider: ThemesProvider) { }

  purchase(name: string) {
    if (this.themesProvider.selected.price) {
      const a = Math.round(Math.random() * 9) + 1;
      const b = Math.round(Math.random() * 9) + 1;
      this.expected = a + b;
      this.ga.trackEvent("Purchase", "Intent", name);
      console.log(`[54cbc5ac05fb] purchase: ${JSON.stringify(name)}`);
      let alert = this.alertCtrl.create({
        title: 'Ask Your Parents',
        message: `${a} + ${b} = ?`,
        inputs: [
          {
            name: 'result',
            placeholder: ''
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              this.ga.trackEvent("Purchase", "Cancel", name);
            }
          },
          {
            text: 'Buy',
            handler: (data) => {
              const result = data['result'];
              console.log(`[bedb0b920248] purchase confirmed: ${result}`);
              this.ga.trackEvent("Purchase", "Confirm", name);
              if (isNaN(result)) {
                this.ga.trackEvent("Parental Gate", "Failed NaN", name);
              } else if (Number(result) != this.expected) {
                this.ga.trackEvent("Parental Gate", "Failed Result", name);
              } else {
                console.log(`[48f5dd0c22e3] parentl gate confirmed: ${this.themesProvider.selected.name}`);
                this.ga.trackEvent("Parental Gate", "Confirmed", name);
                this.themesProvider.purchaseInApp(this.themesProvider.selected.name)
                  .then((purchase: Purchase) => {
                    const theme = this.themesProvider.getThemeByName(purchase.productId);
                    this.ga.trackEvent("Purchase", "Done");
                    this.ga.addTransaction(purchase.transactionId, this.getPlatform(), theme.priceAsDecimal, 0, 0, theme.currency);
                    this.ga.addTransactionItem(purchase.transactionId, theme.title, purchase.productId, 'theme', theme.priceAsDecimal, 1, theme.currency);
                    const toast = this.toastCtrl.create({
                      message: 'Theme has been purchased successfully',
                      duration: 3000
                    });
                    toast.present();
                  })
                  .catch(() => {
                    const toast = this.toastCtrl.create({
                      message: 'Oops! Something went wrong ... ',
                      showCloseButton: true
                    });
                    toast.present();
                  });
              }
            }
          }
        ]
      });
      alert.present();
    } else {
      const alert = this.alertCtrl.create({
        title: 'Ooops!',
        message: 'Aplication store is not available. Please, try again later.',
        buttons: ['Ok']
      });
      alert.present();
    }
  }

  private getPlatform(): string {
    if (this.platform.is('android')) {
      return 'android';
    } else if (this.platform.is('ios')) {
      return 'ios';
    } else {
      return this.platform.platforms().join('-');
    }
  }

  public android() {
    return this.platform.is('android');
  }
}
