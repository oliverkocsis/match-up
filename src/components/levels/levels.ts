import { Component, Output, EventEmitter } from '@angular/core';
import { Platform } from 'ionic-angular';
import { ThemesProvider } from '../../providers/themes/themes';

@Component({
  selector: 'levels',
  templateUrl: 'levels.html'
})
export class LevelsComponent {


  @Output() select: EventEmitter<number[]> = new EventEmitter<number[]>()
  @Output() buy: EventEmitter<void> = new EventEmitter();
  public levels: any[][]

  constructor(private platform: Platform, public themesProvider: ThemesProvider) {
    this.levels = [
      [2, 3],
      [3, 4],
      [4, 6],
      [5, 8]
    ]
  }

  public onClick(width, height) {
    this.select.emit([width, height]);
  }

  public repeat(n: number) {
    return new Array(n);
  }

  public max(id: string): number {
    return this.themesProvider.getImages(id).length;
  }

  public large(): boolean {
    return !this.small();
  }

  public small(): boolean {
    return this.platform.height() < 640;
  }
}
