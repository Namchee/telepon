/**
 * Sebuah `error` yang akan ditampilkan apabila nomor
 * telepon tidak dapat dikenali sebagai nomor telepon yang
 * valid di wilayah Indonesia.
 */
export class InvalidNumberException extends Error {
  public constructor() {
    super(
      // eslint-disable-next-line
      'Nomor telepon yang diberikan tidak valid sebagai nomor telepon yang ada di Indonesia',
    );
  }
}
