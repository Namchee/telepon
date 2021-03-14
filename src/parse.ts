import { AmbiguousNumberException } from './exceptions/ambiguous';
import { InvalidNumberException } from './exceptions/invalid';
import {
  CARD_PROVIDER,
  NOMOR_DARURAT,
  PREFIX_CARD,
  PREFIX_TELEPON,
} from './metadata';
import {
  EmergencyService,
  FixedTelepon,
  MobileTelepon,
  Telepon,
} from './telepon';

/**
 * Attempt to parse a telephone number from the provided string.
 *
 * @param {string} tel a string containing telephone number
 * @param {boolean?} safe determine if the parsing process
 * should only be done when the input is unambiguous. Defaults to `true`
 * @returns {Telepon} parsed input as telephone number with metadata
 * information
 */
export function parse(tel: string, safe: boolean = true): Telepon {
  const emergencyNumber = isEmergencyLine(tel);

  if (emergencyNumber) {
    return emergencyNumber;
  }

  let input: string = tel.replace(/[^\d]+/g, '');

  if (!input.startsWith('0') && !input.startsWith('62')) {
    if (safe) {
      throw new AmbiguousNumberException();
    } else {
      // eslint-disable-next-line
      console.warn('[WARN]: Telephone number doesn\'t start with expected prefix. Parsing capabilities will be limited and may cause invalid validation.');
    }
  }

  if (input.startsWith('62')) {
    input = input.replace(/^62/, '0');
  }

  const number = isFixedLine(input, safe) ?? isMobileNumber(input);

  if (number) {
    return number;
  }

  throw new InvalidNumberException();
}

/**
 * Check if the supplied number is an emergency service number
 *
 * @param {string} tel telephone number
 * @returns {EmergencyService | null} an object that describes
 * the emergency service, `null` otherwise
 */
function isEmergencyLine(tel: string): EmergencyService | null {
  for (const [nomor, deskripsi] of Object.entries(NOMOR_DARURAT)) {
    if (tel === nomor) {
      const emergency: EmergencyService = {
        type: 'emergency',
        originalNumber: tel,
        description: deskripsi,
      };

      return emergency;
    }
  }

  return null;
}

/**
 * Check if the supplied number is an fixed line telephone number
 *
 * @param {string} tel telephone number
 * @param {boolean} safe determine if the parsing process
 * should only be done when the input is unambiguous. Defaults to `true`
 * @returns {FixedTelepon | null} an object that describes
 * the number, `null` otherwise
 */
function isFixedLine(tel: string, safe: boolean = true): FixedTelepon | null {
  for (const [prefix, region] of Object.entries(PREFIX_TELEPON)) {
    // 10 or 11 digits
    const unprefixed = tel.slice(prefix.length);

    if (
      tel.startsWith(prefix) &&
      [10, 11].includes(tel.length) &&
      unprefixed[0] !== '0' &&
      unprefixed[1] !== '1'
    ) {
      return {
        type: 'fixed',
        originalNumber: tel,
        area: Number(prefix[1]),
        region,
      };
    }
  }

  // 7-9 digits
  if (
    !safe &&
    [7, 8, 9].includes(tel.length) &&
    tel[0] !== '0' &&
    tel[1] !== '1'
  ) {
    return {
      type: 'fixed',
      originalNumber: tel,
      area: null,
      region: null,
    };
  }

  return null;
}

/**
 * Check if the supplied number is an mobile telephone number
 *
 * @param {string} tel telephone number
 * @returns {MobileTelepon | null} an object that describes
 * the number, `null` otherwise
 */
function isMobileNumber(tel: string): MobileTelepon | null {
  if (tel.length < 10 || tel.length > 13) {
    return null;
  }

  for (const [card, prefixes] of Object.entries(PREFIX_CARD)) {
    if (prefixes.some(prefix => tel.startsWith(prefix))) {
      let providerName!: string;

      for (const [provider, cards] of Object.entries(CARD_PROVIDER)) {
        if (cards.some(cardName => cardName === card)) {
          providerName = provider;
          break;
        }
      }

      return {
        type: 'mobile',
        originalNumber: tel,
        card,
        provider: providerName,
      };
    }
  }

  return null;
}
