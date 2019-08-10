import { Directive, ViewContainerRef, HostListener } from '@angular/core';
import { EventService } from '../services/event.service';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[formControlName]'
})
export class FormControlDirective {

  constructor(private viewRef: ViewContainerRef, private supplier: EventService) {
  }

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    this.supplier.setEvent(event);
  }
}
