import { parse } from './parse';
import { FixedTelepon, MobileTelepon } from './telepon';

export enum Standard {
  E164 = 'e.164',
  LOCAL = 'local',
  DASHED = 'dashed',
}

/**
 * Format a telephone number to a desired formatting.
 *
 * @param {FixedTelepon | MobileTelepon} number - a fixed line number OR
 * a mobile cellular phone number
 * @param {Standard} standard - numbering format
 * @returns {string} - formatted telephone number
 */
export function format(
  number: FixedTelepon | MobileTelepon,
  standard: Standard = Standard.E164,
): string {
  const separator = standard === Standard.LOCAL ? ' ' : '-';

  if (number.type === 'fixed') {
    if (standard === Standard.E164) {
      return `+62${number.prefix}${number.unprefixedNumber}`;
    }

    const { unprefixedNumber, prefix } = number;
    const splitPoint = Math.floor(unprefixedNumber.length / 2);

    // eslint-disable-next-line max-len
    return `(0${prefix}) ${unprefixedNumber.slice(0, splitPoint)}${separator}${unprefixedNumber.slice(splitPoint)}`;
  } else {
    if (standard === Standard.E164) {
      return `+62${number.originalNumber.slice(1)}`;
    }

    const prefix = number.originalNumber.slice(0, 4);
    const num = number.originalNumber.slice(4);

    const splitPoint = Math.floor(num.length / 2);

    // eslint-disable-next-line max-len
    return `${prefix}${separator}${num.slice(0, splitPoint)}${separator}${num.slice(splitPoint)}`;
  }
}

/**
 * Attempt to format a telephone number from a phone string to a
 * desired formatting. Will throw an error if parsing fails.
 *
 * @param {string} number - a string that contains telephone number
 * @param {Standard} standard - numbering format
 * @returns {string} - formatted telephone number
 */
export function tryFormat(
  number: string,
  standard: Standard = Standard.E164,
): string {
  const telepon = parse(number);

  if (telepon.type === 'emergency') {
    return telepon.originalNumber;
  }

  return format(telepon as FixedTelepon | MobileTelepon, standard);
}
