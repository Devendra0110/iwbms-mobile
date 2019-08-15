import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class EventService {
  eventObservable: Subject<any> = new Subject();

  constructor() { }

  setEvent(ev) {
    this.eventObservable.next(ev);
  }
}
