import { Component, ViewChild } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Slides } from 'ionic-angular';
import { ThemesProvider } from '../../providers/themes/themes';

@Component({
  selector: 'themes',
  templateUrl: 'themes.html'
})
export class ThemesComponent {
  @ViewChild(Slides) slides: Slides;

  constructor(private ga: GoogleAnalytics, private themesProvider: ThemesProvider) { }

  public onNext() {
    console.log("[f4fb3ae5b81a] next theme");
    this.ga.trackEvent("Theme", "next");
    this.slides.slideNext();
  }

  public onPrev() {
    console.log("[4d610295fa75] previous theme");
    this.ga.trackEvent("Theme", "prev");
    this.slides.slidePrev();
  }

  public onSlideDidChange(slides: Slides) {
    console.log(`[2b59b39c8090]: realindex: ${JSON.stringify(slides.realIndex)}`);
    this.themesProvider.select(slides.realIndex);
  }

  public icon(id: string): string {
    return this.themesProvider.getImages(id)[0];
  }
}
