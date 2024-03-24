import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idrCurrency',
  standalone: true,
})
export class IdrCurrencyPipe implements PipeTransform {
  transform(val: string | number): string {
    if (Number(val) < 0) {
      let nominalFormat = Math.abs(Number(val))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return `- Rp${nominalFormat},00`;
    } else {
      let nominalFormat = Number(val)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return `Rp${nominalFormat},00`;
    }
  }
}
