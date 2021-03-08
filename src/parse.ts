import { AmbiguousNumberException } from './exceptions/ambiguous';
import { NOMOR_DARURAT } from './metadata';
import { EmergencyService, Telepon } from './telepon';

/**
 * Attempt to parse a telephone number from the provided string.
 *
 * @param {string} tel - a string containing telephone number
 * @param {boolean?} safe - determine if the parsing process
 * should only be done when the input is unambiguous. Defaults to `true`
 * @returns {Telepon} - parsed input as telephone number with metadata
 * information
 */
export function parse(tel: string, safe: boolean = true): Telepon {
  let input: string = tel.replace(/[^\d]+/g, '');

  for (const [nomor, deskripsi] of Object.entries(NOMOR_DARURAT)) {
    if (input === nomor) {
      const emergency: EmergencyService = {
        type: 'emergency',
        originalNumber: input,
        description: deskripsi,
      };

      return emergency;
    }
  }

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

  return {
    type: 'fixed',
    originalNumber: input,
  };
}
