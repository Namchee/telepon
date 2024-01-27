/**
 * Sebuah `error` yang akan ditampilkan apabila nomor
 * telepon tidak dimulai dengan angka '0' atau '+62'.
 *
 * Hal tersebut dilakukan karena menyebabkan proses
 * parsing menjadi ambigu.
 */
export class AmbiguousNumberError extends Error {
  public constructor() {
    // eslint-disable-next-line max-len
    super('Nomor telepon yang diberikan harus diawali dengan \'0\', \'+62\' atau \'62\'');
    this.name = 'AmbiguousNumberError';
  }
}
