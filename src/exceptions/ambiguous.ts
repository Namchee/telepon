/**
 * Sebuah `error` yang akan ditampilkan apabila nomor
 * telepon tidak dimulai dengan angka '0' atau '+62'.
 *
 * Hal tersebut dilakukan karena menyebabkan proses
 * parsing menjadi ambigu.
 */
export class AmbiguousNumberException extends Error {
  public constructor() {
    super(
      // eslint-disable-next-line max-len
      'Nomor telepon yang diberikan harus diawali dengan \'0\', \'+62\' atau \'62\'',
    );
  }
}
