import { Directive, Input, ElementRef, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  host: {
    '[class.nme-list-item--progress]': 'true',
  },
  selector: '[nmeProgressListItem]',
})
export class ProgressListItemDirective implements OnInit {
  private _value: number = 0;
  private indicator: HTMLDivElement;

  @Input('nmeProgressListItem')
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
    if(this.indicator) {
      this.indicator.style.width = `${ this.value }%`;
    }
  }

  constructor(
      private readonly elementRef: ElementRef<HTMLElement>,
      @Inject(DOCUMENT) private readonly document: Document) {

  }

  public ngOnInit() {
    this.indicator = this.document.createElement('div');
    this.indicator.classList.add(`nme-list-item__indicator`);
    this.indicator.style.width = `${ this.value }%`;
    this.elementRef.nativeElement.appendChild(this.indicator);
  }

}
