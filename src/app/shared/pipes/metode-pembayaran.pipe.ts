import { Pipe, PipeTransform } from '@angular/core';
import { METODE_PEMBAYARAN } from 'src/app/core/constants/general.constant';

@Pipe({
  name: 'metodePembayaran',
  standalone: true,
})
export class MetodePembayaranPipe implements PipeTransform {
  metodePembayaran = [...METODE_PEMBAYARAN];
  descPembayaran = '';

  transform(value: string): string {
    this.metodePembayaran.forEach((metode) => {
      if (metode.key === value) {
        this.descPembayaran = metode.desc;
      }
    });
    return this.descPembayaran;
  }
}
