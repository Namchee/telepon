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
 * @returns {Telepon} parsed input as telephone number with metadata
 * information
 */
export function parse(tel: string): Telepon {
  let input: string = tel.replace(/[^\d]+/g, '');

  const emergencyNumber = isEmergencyLine(input);

  if (emergencyNumber) {
    return emergencyNumber;
  }

  if (!input.startsWith('0') && !input.startsWith('62')) {
    throw new AmbiguousNumberException();
  }

  if (input.startsWith('62')) {
    input = input.replace(/^62/, '0');
  }

  const number = isFixedLine(input) ?? isMobileNumber(input);

  if (number) {
    return number;
  }

  throw new InvalidNumberException();
}

/**
 * Attempt to parse an emergency telephone number from the provided string.
 *
 * @param {string} tel a string containing telephone number
 * @returns {EmergencyService} parsed input as telephone number with metadata
 * information
 */
export function parseAsEmergency(tel: string): EmergencyService {
  const input = tel.replace(/[^\d]/g, '');

  const emergencyNumber = isEmergencyLine(input);

  if (emergencyNumber) {
    return emergencyNumber;
  }

  throw new InvalidNumberException();
}

/**
 * Attempt to parse an fixed line telephone number from the provided string.
 *
 * @param {string} tel a string containing telephone number
 * @returns {EmergencyService} parsed input as fixed line telephone number with
 * metadata information
 */
export function parseAsFixedLine(tel: string): FixedTelepon {
  const input = tel.replace(/[^\d]/g, '');

  const fixedLine = isFixedLine(input);

  if (fixedLine) {
    return fixedLine;
  }

  throw new InvalidNumberException();
}


/**
 * Attempt to parse an mobile telephone number from the provided string.
 *
 * @param {string} tel a string containing telephone number
 * @returns {EmergencyService} parsed input as mobile telephone number with
 * metadata information
 */
export function parseAsMobile(tel: string): MobileTelepon {
  const input = tel.replace(/[^\d]/g, '');

  const mobile = isMobileNumber(input);

  if (mobile) {
    return mobile;
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
 * @returns {FixedTelepon | null} an object that describes
 * the number, `null` otherwise
 */
function isFixedLine(tel: string): FixedTelepon | null {
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
