import { describe, it, expect } from 'vitest';

import { AmbiguousNumberError } from './errors/ambiguous';
import { InvalidNumberError } from './errors/invalid';
import {
  EmergencyService,
  FixedTelepon,
  MobileTelepon,
} from './telepon';
import {
  parse,
  parseAsEmergency,
  parseAsFixedLine,
  parseAsMobile,
} from './parse';

describe('parse', () => {
  // eslint-disable-next-line max-len
  it('should throw an error when number is not a telephone number', () => {
    const input = '1234567';

    try {
      parse(input);

      throw new Error('Input is not a telephone number');
    } catch (err) {
      expect(err).toBeInstanceOf(AmbiguousNumberError);
    }
  });

  it('should be able to sanitize commonly-formatted inputs', () => {
    const input = '(021) 564-3178';

    const telepon = parse(input) as FixedTelepon;

    expect(telepon.type).toBe('fixed');
    expect(telepon.originalNumber).toBe('0215643178');

    expect(Object.keys(telepon).length).toBe(6);
    expect(telepon.hasOwnProperty('area')).toBe(true);
    expect(telepon.hasOwnProperty('region')).toBe(true);

    const fixedLine = telepon as FixedTelepon;

    expect(fixedLine.unprefixedNumber).toBe('5643178');
    expect(fixedLine.prefix).toBe('21');
    expect(fixedLine.area).toBe(2);
    expect(fixedLine.region).toStrictEqual([
      'Jakarta',
      'Tangerang',
      'Tangerang Selatan',
      'Bekasi',
      'Depok',
      'Kabupaten Bogor',
    ]);
  });

  it('should be able to sanitize badly-formatted inputs', () => {
    const input = 'Telepon: (0 - 621  ) 22 1 23 33';

    const telepon = parse(input);

    expect(telepon.type).toBe('fixed');
    expect(telepon.originalNumber).toBe('06212212333');

    expect(Object.keys(telepon).length).toBe(6);
    expect(telepon.hasOwnProperty('area')).toBe(true);
    expect(telepon.hasOwnProperty('region')).toBe(true);

    const fixedLine = telepon as FixedTelepon;

    expect(fixedLine.unprefixedNumber).toBe('2212333');
    expect(fixedLine.prefix).toBe('621');
    expect(fixedLine.area).toBe(6);
    expect(fixedLine.region)
      .toStrictEqual(['Tebing Tinggi', 'Serdang Bedagai']);
  });

  it('should be able to parse cellular telephone number', () => {
    const input = '08158372500';

    const telepon = parse(input);

    expect(telepon.type).toBe('mobile');
    expect(telepon.originalNumber).toBe(input);

    expect(Object.keys(telepon).length).toBe(4);
    expect(telepon.hasOwnProperty('card')).toBe(true);
    expect(telepon.hasOwnProperty('provider')).toBe(true);

    const mobileLine = telepon as MobileTelepon;

    expect(mobileLine.card).toBe('IM3 Ooredoo');
    expect(mobileLine.provider).toBe('PT Indosat');
  });

  it('should be able to parse internationally-formatted number', () => {
    const input = '+62 8158372500';

    const telepon = parse(input);

    expect(telepon.type).toBe('mobile');
    expect(telepon.originalNumber).toBe('08158372500');

    expect(Object.keys(telepon).length).toBe(4);
    expect(telepon.hasOwnProperty('card')).toBe(true);
    expect(telepon.hasOwnProperty('provider')).toBe(true);

    const mobileLine = telepon as MobileTelepon;

    expect(mobileLine.card).toBe('IM3 Ooredoo');
    expect(mobileLine.provider).toBe('PT Indosat');
  });

  it('should be able to parse emergency services number', () => {
    const input = '110';

    const telepon = parse(input);

    expect(telepon.type).toBe('emergency');
    expect(telepon.originalNumber).toBe('110');

    expect(Object.keys(telepon).length).toBe(3);

    const emergencyLine = telepon as EmergencyService;

    expect(emergencyLine.description).toBe('Polisi');
  });

  it('should throw an error when the input is not a telephone number', () => {
    try {
      const input = '011111111111111111111111111111111111';

      parse(input);

      throw new Error('Input is an invalid telephone number');
    } catch (err) {
      expect(err).toBeInstanceOf(InvalidNumberError);
    }
  });

  it('should be able to distinguish a fake fixed line number', () => {
    try {
      const input = '0211223456';

      parse(input);
    } catch (err) {
      expect(err).toBeInstanceOf(InvalidNumberError);
    }
  });
});

describe('parseAsEmergency', () => {
  it('should be able to parse emergency number', () => {
    const input = '110';

    const number = parseAsEmergency(input);

    expect(number.type).toBe('emergency');
    expect(number.description).toBe('Polisi');
    expect(number.originalNumber).toBe('110');
  });

  // eslint-disable-next-line
  it('should throw an error when the provided number is not an emergency service', () => {
    const input = '12222';

    try {
      parseAsEmergency(input);

      throw new Error('Input is not an emergency service number');
    } catch (err) {
      expect(err).toBeInstanceOf(InvalidNumberError);
    }
  });
});

describe('parseAsFixedLine', () => {
  it('should be able to parse fixed line number', () => {
    const input = '(022) 566-37848';

    const number = parseAsFixedLine(input);

    expect(number.type).toBe('fixed');
    expect(number.unprefixedNumber).toBe('56637848');
    expect(number.originalNumber).toBe('02256637848');
    expect(number.prefix).toBe('22');
    expect(number.area).toBe(2);
    expect(number.region).toStrictEqual([
      'Bandung',
      'Cimahi',
    ]);
  });

  it('should be able to parse internationally-formatted number', () => {
    const input = '+62 22 566 37848';

    const number = parseAsFixedLine(input);

    expect(number.type).toBe('fixed');
    expect(number.unprefixedNumber).toBe('56637848');
    expect(number.prefix).toBe('22');
    expect(number.originalNumber).toBe('02256637848');
    expect(number.area).toBe(2);
    expect(number.region).toStrictEqual([
      'Bandung',
      'Cimahi',
    ]);
  });

  // eslint-disable-next-line
  it('should throw an error when the provided number is not a fixed line number', () => {
    const input = '1230210546231546';

    try {
      parseAsEmergency(input);

      throw new Error('Input is not a fixed line number');
    } catch (err) {
      expect(err).toBeInstanceOf(InvalidNumberError);
    }
  });

  it('should be able to distinguish a fake fixed line number', () => {
    try {
      const input = '0211223456';

      parse(input);
    } catch (err) {
      expect(err).toBeInstanceOf(InvalidNumberError);
    }
  });
});

describe('parseAsMobile', () => {
  it('should be able to parse mobile number', () => {
    const input = '0895 6132 37041';

    const number = parseAsMobile(input);

    expect(number.type).toBe('mobile');
    expect(number.originalNumber).toBe('0895613237041');
    expect(number.card).toBe('3');
    expect(number.provider).toBe('PT Hutchison 3 Indonesia');
  });

  it('should be able to parse internationally-formatted mobile number', () => {
    const input = '+62 895 6132 37041';

    const number = parseAsMobile(input);

    expect(number.type).toBe('mobile');
    expect(number.originalNumber).toBe('0895613237041');
    expect(number.card).toBe('3');
    expect(number.provider).toBe('PT Hutchison 3 Indonesia');
  });

  // eslint-disable-next-line
  it('should throw an error when the provided number is not a mobile line number', () => {
    const input = '0215643178';

    try {
      parseAsMobile(input);

      throw new Error('Input is not a mobile number');
    } catch (err) {
      expect(err).toBeInstanceOf(InvalidNumberError);
    }
  });
});
