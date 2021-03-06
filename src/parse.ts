import { AmbiguousNumberException } from './exceptions/ambiguous';
import { Telepon } from './telepon';

/**
 * Attempt to parse a telephone number from the provided string.
 *
 * @param {string} tel - a string containing telephone number
 * @returns {Telepon} - a parsed telephone number with metadata
 * information
 */
export function parse(tel: string): Telepon {
  let input: string = tel.replace(/[^\d]+/g, '');

  if (!input.startsWith('0') || !input.startsWith('62')) {
    throw new AmbiguousNumberException();
  }

  if (input.startsWith('62')) {
    input = input.replace(/^62/, '0');
  }

  return {
    type: 'fixed',
    originalNumber: '',
  };
}
