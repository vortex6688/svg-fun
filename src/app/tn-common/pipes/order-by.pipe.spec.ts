import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
  const pipe = new OrderByPipe();

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort basic array ascending by default', () => {
    const basicArray = ['z', 'h', 'as'];
    const expected = ['as', 'h', 'z'];
    expect(pipe.transform(basicArray)).toEqual(expected);
  });

  it('should sort an array of sorted string arrays ascending by default (empty arrays first)', () => {
    const basicArray = [['s', 'h', 'z'], ['b'], ['as', 'h', 'z'], ['b', 'h'], []];
    const expected = [[], ['as', 'h', 'z'], ['b'], ['b', 'h'], ['s', 'h', 'z']];
    expect(pipe.transform(basicArray)).toEqual(expected);
  });

  it('should sort an array of sorted number arrays ascending by default (empty arrays first)', () => {
    const basicArray = [[1, 2, 6], [4, 7, 11], [1, 3], [1, 2, 6, 8], []];
    const expected = [[], [1, 2, 6], [1, 2, 6, 8], [1, 3], [4, 7, 11]];
    expect(pipe.transform(basicArray)).toEqual(expected);
  });

  it('should sort multidimensional number array by single provided key', () => {
    const multiArray = [
      { key: 12 },
      { key: 34567 },
      { key: 59 },
      { key: -10 },
    ];
    const sortKey = 'key';
    const expected = [...multiArray].sort((a, b) => a[sortKey] - b[sortKey]);
    expect(pipe.transform(multiArray, [sortKey])).toEqual(expected);
    expect(pipe.transform(multiArray, ['+'])).toEqual(expected);
    expect(pipe.transform(multiArray, [`-${sortKey}`])).toEqual(expected.reverse());
  });

  it('should sort multidimensional date array by single provided key', () => {
    const multiArray = [
      { key: new Date(Date.now() - 5000) },
      { key: new Date(Date.now() + 5000) },
      { key: new Date(Date.now() - 12000) },
      { key: new Date(Date.now()) },
      { key: new Date(Date.now() + 554) },
    ];
    const sortKey = 'key';
    const expected = [...multiArray].sort((a: any, b: any) => {
      a = +a[sortKey];
      b = +b[sortKey];
      return a - b;
    });
    expect(pipe.transform(multiArray, [sortKey])).toEqual(expected);
    expect(pipe.transform(multiArray, ['+'])).toEqual(expected);
    expect(pipe.transform(multiArray, [`-${sortKey}`])).toEqual(expected.reverse());
  });

  it('should sort multidimensional string array by single provided key', () => {
    const multiArray = [
      { key: 'va' },
      { key: 'gaga' },
      { key: 'dbghjh' },
      { key: 'testString' },
    ];
    const sortKey = 'key';
    const expected = [...multiArray].sort((a, b) => {
      if (a[sortKey].toLowerCase() < b[sortKey].toLowerCase()) { return -1; }
      if (a[sortKey].toLowerCase() > b[sortKey].toLowerCase()) { return 1; }
      return 0;
    });
    expect(pipe.transform(multiArray, [sortKey])).toEqual(expected);
    expect(pipe.transform(multiArray, [`-${sortKey}`])).toEqual(expected.reverse());
  });

  it('should sort multidimensional array by multiple provided keys', () => {
    const date = Date.now();
    const multiArray = [
      { key: 'va', no: 234, date: new Date(date), },
      { key: 'gaga', no: 8765, date: new Date(date - 500000) },
      { key: 'aaa', no: 8765, date: new Date(date + 5000000) },
      { key: 'aaa', no: 8765, date: new Date(date - 10000) },
      { key: 'aaa', no: 8765, date: new Date(date) },
    ];
    const ascKeys = ['no', 'key', 'date'];
    const expectedAsc = [
      multiArray[0],
      multiArray[3],
      multiArray[4],
      multiArray[2],
      multiArray[1],
    ];
    expect(pipe.transform(multiArray.slice(0), ascKeys)).toEqual(expectedAsc, '+no, +key, +date');

    const ascDescKeys = ['no', '-key', '-date'];
    const expectedAscDesc = [
      multiArray[0],
      multiArray[1],
      multiArray[2],
      multiArray[4],
      multiArray[3],
    ];
    expect(pipe.transform(multiArray.slice(0), ascDescKeys)).toEqual(expectedAscDesc, '+no, -key, -date');

    const descKeys = ['-no', '-key', '-date'];
    const expectedDesc = [
      multiArray[1],
      multiArray[2],
      multiArray[4],
      multiArray[3],
      multiArray[0],
    ];
    expect(pipe.transform(multiArray.slice(0), descKeys)).toEqual(expectedDesc, '-no, -key, -date');
  });
});
