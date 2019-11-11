import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  selector: 'card',
  templateUrl: 'card.html'
})
export class CardComponent implements OnInit {

  public background: string = 'assets/imgs/picture.svg';
  @Input() public src: string;
  @Input() public visible = false;
  @Input() public enabled = true;
  @Input() public match = false;
  @Output() public change = new EventEmitter<boolean>();

  constructor(public ga: GoogleAnalytics) { }

  ngOnInit(): void {
    console.log(`[e29b84934b33] card: ${this.src}`);
  }

  /**
   * Emit visible event in case of being upwards
   */
  public onClick() {
    if (this.enabled) {
      this.visible = !this.visible;
      this.change.emit(this.visible);
    }
  }
}
