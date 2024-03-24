import { Directive, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import {
  specialKeys,
  numberKeys,
  NUMBER,
} from 'src/app/core/constants/general.constant';

@Directive({
  selector: '[kasirNumbersOnly]',
  standalone: true,
})
export class NumbersOnlyDirective {
  constructor(private readonly model: NgControl) {}

  private readonly _unsubscribeAll = new Subject<void>();

  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {
    this.preventNotNumber(event);
  }

  @HostListener('paste', ['$event']) onPaste(event: any) {
    const clipboardData = (event.originalEvent || event).clipboardData.getData(
      'text/plain'
    );
    this.numberPaste(clipboardData, event);
  }

  preventNotNumber(event: KeyboardEvent) {
    const input = event.key;

    // Check if the input is a number or a special key like backspace or delete
    if (
      isNaN(Number(input)) &&
      event.code !== 'Backspace' &&
      event.code !== 'Delete'
    ) {
      event.preventDefault();
    }
  }

  numberPaste(clipboardData: any, event: any) {
    if (clipboardData) {
      const regEx = new RegExp('^[0-9]*$');
      if (!regEx.test(clipboardData)) {
        event.preventDefault();
      }
    }
    return;
  }
}
