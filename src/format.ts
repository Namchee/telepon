import { Telepon } from './telepon';

export interface FormatOptions {
  standard: string;
  format: string;
}

/**
 * Format a telephone number to a desired formatting.
 *
 * @param {Telepon} number - an instance of `Telepon`
 * @param {FormatOptions} options - formatting options
 * @returns {string} - a formatted telephone number
 */
export function format(number: Telepon, options?: FormatOptions): string {
  return '';
}
