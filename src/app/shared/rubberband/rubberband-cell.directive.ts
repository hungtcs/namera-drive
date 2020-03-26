import { Directive, Input, EventEmitter, Output, ElementRef } from '@angular/core';

@Directive({
  host: {
    '[class.tcs-rubberband-cell]': 'true',
  },
  selector: '[applyRubberbandCell]',
})
export class RubberbandCellDirective<T = any> {

  @Input('applyRubberbandCell')
  public data: T;

  @Input('rubberbandCellSelected')
  public selected: boolean = false;

  @Output('rubberbandCellSelectedChange')
  public selectedChange: EventEmitter<boolean> = new EventEmitter();

  public get nativeElement() {
    return this.elementRef.nativeElement;
  }

  constructor(
      public readonly elementRef: ElementRef<HTMLElement>) {

  }

}
