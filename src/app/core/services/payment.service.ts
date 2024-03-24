import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { IPaymentModel } from '../model/payment.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private dbPath = '/payment';
  paymentRef: AngularFireList<IPaymentModel>;

  constructor(private readonly db: AngularFireDatabase) {
    this.paymentRef = db.list(this.dbPath);
  }

  getPaginatedData(startDate: string): Observable<any[]> {
    return this.db
      .list(this.dbPath, (ref) =>
        ref.orderByChild('createdDate').equalTo(startDate)
      )
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((c) => ({
            key: c.payload.key!,
            value: c.payload.val() as IPaymentModel,
          }));
        })
      );
  }

  getPaymentByKey(paymentKey: string): Observable<IPaymentModel | null> {
    return this.db
      .list<IPaymentModel>('payment', (ref) =>
        ref.orderByKey().equalTo(paymentKey)
      )
      .valueChanges()
      .pipe(
        map((payments) => (payments.length > 0 ? payments[0] : null)) // Return the first payment or null
      );
  }

  create(payment: IPaymentModel): Promise<string> {
    // Push the payment data and get the reference
    const paymentEntryRef = this.paymentRef.push(payment);

    // Get the generated key from the reference
    if (paymentEntryRef.key) {
      const paymentKey = paymentEntryRef.key;
      return Promise.resolve(paymentKey);
    }

    return Promise.reject(
      'Terjadi kesalahan pada sistem silahkan coba beberapa saat lagi.'
    );
  }

  delete(key: string): Promise<void> {
    return this.paymentRef.remove(key);
  }
}
