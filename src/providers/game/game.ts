import { Injectable } from '@angular/core';
import { ThemesProvider } from '../themes/themes';
import { Card } from '../../models/card';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Injectable()
export class GameProvider {

  public cards: Card[][];
  public guess: Card[];
  public count: number;
  public width: number;
  public height: number;

  constructor(private themesProvider: ThemesProvider, private ga: GoogleAnalytics) { }

  /**
   * Initialize or reset the game
   * @param width Width
   * @param height Height
   */
  initialize(width: number, height: number, theme: string): Card[][] {
    this.width = width;
    this.height = height;
    console.log(`[f610e70738a7] width * height (theme): ${this.width} * ${this.height} (${theme})`);

    this.guess = [];
    this.count = width * height;
    let _cards = [];
    let _images = this.themesProvider.getImages(theme);
    console.log(`[5c93ce998fca] number of images in theme: ${_images.length}`);

    // Shuffle Images
    _images = this.shuffle(_images, height * width / 2);
    _images = _images.concat(_images);
    _images = this.shuffle(_images, height * width);
    console.log(`[00369f43c7c5] number of images: ${_images.length}`);

    // Create Board
    for (let _h = 0; _h < height; _h++) {
      let _row: Card[] = [];
      for (let _w = 0; _w < width; _w++) {
        _row.push(new Card(_images[(_h * width + _w) % _images.length]));
      }
      _cards.push(_row);
    }
    this.cards = _cards;
    return this.cards;
  }

  /**
   * 
   * @param x 
   * @param y 
   * @returns True if won. False otherwise. 
   */
  public show(x: number, y: number): boolean {
    const _card = this.cards[y][x];
    console.log(`[bb54e936bcd5] card shown: ${JSON.stringify(_card)}`);
    _card.enabled = false;
    _card.visible = true;
    if (this.guess.length >= 2) {
      console.log("[ec208e4ecab5] wrong guess and hide cards");
      for (const _c of this.guess) {
        this.ga.trackEvent("Game", "wrong guess", `${this.width} * ${this.height}`);
        _c.enabled = true;
        _c.visible = false;
      }
      this.guess = [];
    }
    this.guess.push(_card);
    if (this.guess.length >= 2) {
      console.log("[cbbdef86b96f] correct guess and disable cards");
      if (this.guess[0].src == this.guess[1].src) {
        for (const _c of this.guess) {
          this.ga.trackEvent("Game", "correct guess", `${this.width} * ${this.height}`);
          _c.match = true;
          this.count--;

        }
        this.guess = [];
      }
    }
    console.log(`[654b4a0dd355] guess: ${JSON.stringify(this.guess)}`);
    return this.count <= 0;
  }

  public clear() {
    this.width = 0;
    this.height = 0;
    this.count = 0;
    this.guess = [];
    this.cards = [[]];
  } F

  /**
   * Shuffle the items within an array,
   * @param array Array
   * @param size Number of items to be kept (default: all)
   */
  private shuffle(array: any[], size: number = array.length) {
    var shuffled = array.slice(0), i = array.length, temp, index;
    while (i--) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
  }
}
