import { parseAsFixedLine, parseAsMobile } from './../src/parse';
import { Standard, format, tryFormat } from './../src/format';
import { InvalidNumberException } from '../src/exceptions/invalid';

describe('format', () => {
  it('should be able to format fixed line number in e.164 format', () => {
    const input = '0215643178';
    const telepon = parseAsFixedLine(input);

    const result = format(telepon);

    expect(result).toBe('+62215643178');
  });

  it('should be able to format fixed line number in local format', () => {
    const input = '0215643178';
    const telepon = parseAsFixedLine(input);

    const result = format(telepon, Standard.LOCAL);

    expect(result).toBe('(021) 564 3178');
  });

  it('should be able to format fixed line number in dashed format', () => {
    const input = '0215643178';
    const telepon = parseAsFixedLine(input);

    const result = format(telepon, Standard.DASHED);

    expect(result).toBe('(021) 564-3178');
  });

  it('should be able to format fixed line number with even length', () => {
    const input = '02256477890';
    const telepon = parseAsFixedLine(input);

    const result = format(telepon, Standard.LOCAL);

    expect(result).toBe('(022) 5647 7890');
  });

  it('should be able to format mobile number in e.164 format', () => {
    const input = '0895613237041';
    const telepon = parseAsMobile(input);

    const result = format(telepon);

    expect(result).toBe('+62895613237041');
  });

  it('should be able to format mobile number in local format', () => {
    const input = '0895613237041';
    const telepon = parseAsMobile(input);

    const result = format(telepon, Standard.LOCAL);

    expect(result).toBe('0895 6132 37041');
  });

  it('should be able to format mobile number in dashed format', () => {
    const input = '0895613237041';
    const telepon = parseAsMobile(input);

    const result = format(telepon, Standard.DASHED);

    expect(result).toBe('0895-6132-37041');
  });

  it('should be able to format even numbered mobile number', () => {
    const input = '087826890231';
    const telepon = parseAsMobile(input);

    const result = format(telepon, Standard.LOCAL);

    expect(result).toBe('0878 2689 0231');
  });
});

describe('tryFormat', () => {
  it('should throw an error when input is not a telephone number', () => {
    const input = '0123456789';

    try {
      tryFormat(input);

      throw new Error('Input is not a number');
    } catch (err) {
      expect(err).toBeInstanceOf(InvalidNumberException);
    }
  });

  it('should return emergency number service unchanged', () => {
    const input = '119';

    const result = tryFormat(input);

    expect(result).toBe('119');
  });
});

