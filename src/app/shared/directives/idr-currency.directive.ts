import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { IdrCurrencyPipe } from '../pipes/idr-currency.pipe';
import {
  specialKeys,
  numberKeys,
  NUMBER,
} from 'src/app/core/constants/general.constant';

@Directive({
  selector: '[kasirIdrCurrency]',
  standalone: true,
  providers: [IdrCurrencyPipe],
})
export class IdrCurrencyDirective {
  @HostListener('blur', ['$event'])
  onBlur(value: any) {
    this.onInputChange(value);
  }

  @HostListener('keypress', ['$event']) onKeypress(event: KeyboardEvent) {
    this.preventNotNumber(event);
  }

  @HostListener('paste', ['$event']) onPaste(event: any) {
    const clipboardData = (event.originalEvent || event).clipboardData.getData(
      'text/plain'
    );
    this.numberPaste(clipboardData, event);
  }

  constructor(
    private readonly idrCurrencyPipe: IdrCurrencyPipe,
    public ngControl: NgControl
  ) {}

  onInputChange($event: any) {
    let value = $event.target.value;
    if (!value && !isNaN(value)) return;

    let plainNumber: number;
    let formattedValue: string;

    let decimalSeparatorIndex = value.lastIndexOf(',');
    if (decimalSeparatorIndex > NUMBER.ZERO) {
      // if input has decimal part
      let wholeNumberPart = value.substring(NUMBER.ZERO, decimalSeparatorIndex);
      let decimalPart = value.substr(decimalSeparatorIndex + NUMBER.ONE);
      plainNumber = parseFloat(
        wholeNumberPart.replace(/[^\d]/g, '') + '.' + decimalPart
      );
    } else {
      // input does not have decimal part
      plainNumber = parseFloat(value.replace(/[^\d]/g, ''));
    }

    if (!plainNumber) {
      formattedValue = '';
    } else {
      formattedValue = this.idrCurrencyPipe.transform(
        plainNumber.toFixed(NUMBER.TWO)
      );
    }

    this.ngControl.valueAccessor?.writeValue(String(formattedValue));
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
