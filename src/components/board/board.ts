import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GameProvider } from '../../providers/game/game';

@Component({
  selector: 'board',
  templateUrl: 'board.html'
})
export class BoardComponent {
  @Input() public width: number;
  @Input() public height: number;
  @Input() public maxWidth: number;
  @Output() public win: EventEmitter<boolean> = new EventEmitter();

  constructor(public gameProvider: GameProvider) { }

  onCardChange(visible: boolean, x: number, y: number): void {
    console.log(`[dcfa13b02480] card change: ${visible} (${x},${y})`);
    if (visible) {
      if (this.gameProvider.show(x, y)) {
        this.win.emit(true);
      }
    }
  }
}