export interface IPaymentModel {
  createdDate: string;
  metodePembayaran: string;
  jumlahTagihan: number;
  jumlahDibayar: number;
  jumlahKembalian: number;
  tipePelanggan: string;
  pesanan: IPesananModel[];
}

export interface IPesananModel {
  key: string;
  jumlah: number;
}
