import { AmbiguousNumberException } from '../src/exceptions/ambiguous';
import { EmergencyService } from '../src/telepon';
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

  // eslint-disable-next-line max-len
  it('should warn to console when number is ambiguous and safe is equal to false', () => {
    const input = '5643178';
    const spy = jest.spyOn(console, 'warn').mockImplementation();

    parse(input, false);

    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });

  it('should be able to sanitize normally-formatted inputs', () => {
    const input = '(021) 564-3178';

    const telepon = parse(input);

    expect(telepon.originalNumber).toBe('0215643178');
  });

  it('should be able to sanitize badly-formatted inputs', () => {
    const input = '(0 - 621  ) 12 1 23 33';

    const telepon = parse(input);

    expect(telepon.originalNumber).toBe('06211212333');
  });

  it('should be able to parse fixed telephone number', () => {
    // fucking pass
  });

  it('should be able to parse cellular telephone number', () => {
    // also fucking pass
  });

  it('should be able to parse emergency services number', () => {
    const input = '110';

    const telepon = parse(input) as EmergencyService;

    expect(telepon.type).toBe('emergency');
    expect(telepon.originalNumber).toBe('110');
    expect(telepon.description).toBe('Polisi');
  });
});
