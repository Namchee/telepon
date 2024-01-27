/**
 * Sebuah `error` yang akan ditampilkan apabila nomor
 * telepon tidak dapat dikenali sebagai nomor telepon yang
 * valid di wilayah Indonesia.
 */
export class InvalidNumberError extends Error {
  public constructor() {
    // eslint-disable-next-line max-len
    super('Nomor telepon yang diberikan tidak valid sebagai nomor telepon yang ada di Indonesia');
    this.name = 'InvalidNumberError';
  }
}
