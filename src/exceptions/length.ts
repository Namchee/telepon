/**
 * Sebuah `error` yang akan ditampilkan apabila
 * panjang nomor telepon kurang dari 7 digit
 * (tidak termasuk kode area dan wilayah).
 */
export class NumberTooShortException extends Error {
  public constructor() {
    super('Jumlah digit dalam nomor telepon terlalu sedikit');
  }
}

/**
 * Sebuah `error` yang akan ditampilkan apabila
 * panjang nomor telepon lebih dari 13 digit
 * (tidak termasuk kode area dan wilayah).
 */
export class NumberTooLongException extends Error {
  public constructor() {
    super('Jumlah digit dalam nomor telepon terlalu panjang');
  }
}
