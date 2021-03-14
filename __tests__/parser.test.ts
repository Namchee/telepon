import { AmbiguousNumberException } from '../src/exceptions/ambiguous';
import { InvalidNumberException } from '../src/exceptions/invalid';
import { EmergencyService, FixedTelepon, MobileTelepon } from '../src/telepon';
import { parse } from './../src/parse';

describe('Parser test', () => {
  // eslint-disable-next-line max-len
  it('should throw an error when number is ambiguous and safe is equal to true', () => {
    const input = '1234567';

    try {
      parse(input);

      throw new Error(
        'Should throw an error as 1234567 doesn\'t start with \'0\'',
      );
    } catch (err) {
      expect(err).toBeInstanceOf(AmbiguousNumberException);
    }
  });

  it('should be able to sanitize commonly-formatted inputs', () => {
    const input = '(021) 564-3178';

    const telepon = parse(input) as FixedTelepon;

    expect(telepon.type).toBe('fixed');
    expect(telepon.originalNumber).toBe('0215643178');

    expect(Object.keys(telepon).length).toBe(4);
    expect(telepon.hasOwnProperty('area')).toBe(true);
    expect(telepon.hasOwnProperty('region')).toBe(true);

    const fixedLine = telepon as FixedTelepon;

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

    expect(Object.keys(telepon).length).toBe(4);
    expect(telepon.hasOwnProperty('area')).toBe(true);
    expect(telepon.hasOwnProperty('region')).toBe(true);

    const fixedLine = telepon as FixedTelepon;

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

      throw new Error(
        'Should throw an error when input is not a telephone number',
      );
    } catch (err) {
      expect(err).toBeInstanceOf(InvalidNumberException);
    }
  });

  it('should be able to distinguish a fake fixed line number', () => {
    try {
      const input = '0211223456';

      parse(input);
    } catch (err) {
      expect(err).toBeInstanceOf(InvalidNumberException);
    }
  });
});
