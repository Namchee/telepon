import { parse } from './parse';
import { FixedTelepon, MobileTelepon } from './telepon';

export enum Format {
  E164 = 'e.164',
  LOCAL = 'local',
}

/**
 * Format a telephone number to a desired formatting.
 *
 * @param {FixedTelepon | MobileTelepon} number - a fixed line number OR
 * a mobile cellular phone number
 * @param {Format} format - number format
 * @returns {string} - formatted telephone number
 */
export function format(
  number: FixedTelepon | MobileTelepon,
  format: Format = Format.E164,
): string {
  
}

/**
 * Attempt to format a telephone number from a phone string to a
 * desired formatting.
 *
 * @param {string} number - a string that contains telephone number
 * @param {FormatOptions} options - formatting options
 * @return {string} - formatted telephone number
 */
export function tryFormat(number: string, format: Format = Format.E164): string {
  const telephone = parse(number);
}
