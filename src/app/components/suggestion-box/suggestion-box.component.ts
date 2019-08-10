import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { EventService } from "../../services/event.service";

@Component({
  selector: 'iwbms-suggestion-box',
  templateUrl: './suggestion-box.component.html',
  styleUrls: ['./suggestion-box.component.scss'],
})
export class SuggestionBoxComponent implements AfterViewInit {


  input: string[];

  output: Subject<any> = new Subject();

  DOMInstance: HTMLElement;

  constructor(private eventsSupplier: EventService) { }

  ngAfterViewInit() {
    this.DOMInstance = document.querySelector('.sg-box-container');

    this.eventsSupplier.eventObservable.subscribe((event) => {
      console.log(event);

      if (event.code === 'Enter' || event.code === 'Space' || event.code === 'Tab') {


        const selectedLi: HTMLLIElement = document.querySelector('.selected');

        if (selectedLi) {
          this.output.next(selectedLi.innerText);
          this.input = [];
        }


      } else if (event.code === 'ArrowDown') {

        const selectedLi: HTMLLIElement = document.querySelector('.selected');

        if (selectedLi && selectedLi.nextElementSibling) {
          selectedLi.nextElementSibling.classList.add('selected');
          selectedLi.classList.remove('selected');
        }
      } else if (event.code === 'ArrowUp') {
        const selectedLi: HTMLLIElement = document.querySelector('.selected');

        if (selectedLi && selectedLi.previousElementSibling) {
          selectedLi.previousElementSibling.classList.add('selected');
          selectedLi.classList.remove('selected');
        }
      }
    });
  }

  getValueOnClick(event) {
    this.output.next(event.target.innerText);
    this.input = [];
  }


}
