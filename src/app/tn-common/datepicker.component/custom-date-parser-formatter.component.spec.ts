
import { CustomDateParserFormatter } from './custom-date-parser-formatter.component';

describe('ngb-date parsing and formatting', () => {
  let pf: CustomDateParserFormatter;

  beforeEach(() => { pf = new CustomDateParserFormatter(); });

  describe('parsing', () => {

    it('should parse valid date', () => {
      expect(pf.parse('2016')).toEqual({year: 2016, month: null, day: null});
      expect(pf.parse('02/2016')).toEqual({year: 2016, month: 2, day: null});
      expect(pf.parse('05/12/2016')).toEqual({year: 2016, month: 5, day: 12});
    });

    it('should do its best parsing incomplete dates',
       () => { expect(pf.parse('5/3/2011')).toEqual({year: 2011, month: 5, day: 3});
    });

    it('should return null if value is not passed', () => {
      expect(pf.parse('')).toBeNull();
    });

    it('if length is > 10', () => {
      expect(pf.parse('07/02/2009/11')).toBeNull();
    });

    it('if values length is > 3', () => {
      expect(pf.parse('07/02/29/1')).toBeNull();
    });
  });

  describe('formatting', () => {

    it('should format null and undefined as an empty string', () => {
      expect(pf.format(null)).toBe('');
      expect(pf.format(undefined)).toBe('');
    });

    it('should format a valid date', () => {
      expect(pf.format({year: 2016, month: 10, day: 15})).toBe('10/15/2016');
    });

    it('should format a valid date with padding', () => {
      expect(pf.format({year: 2016, month: 10, day: 5})).toBe('10/05/2016');
    });

    it('should try its best with invalid dates', () => {
      expect(pf.format({year: 2016, month: NaN, day: undefined})).toBe('//2016');
      expect(pf.format({year: 2016, month: null, day: 0})).toBe('/00/2016');
    });
  });

});
