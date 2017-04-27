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

  it('should sort multidimensional string array by multiple provided keys', () => {
    const multiArray = [
      { key: 'va', no: 234 },
      { key: 'gaga', no: 8765 },
      { key: 'dbghjh', no: 1 },
      { key: 'aaa', no: 8765 },
      { key: 'aaa', no: 8765 },
    ];
    const ascKeys = ['no', 'key'];
    const expectedAsc = [
      { key: 'dbghjh', no: 1 },
      { key: 'va', no: 234 },
      { key: 'aaa', no: 8765 },
      { key: 'aaa', no: 8765 },
      { key: 'gaga', no: 8765 },
    ];
    expect(pipe.transform(multiArray, ascKeys)).toEqual(expectedAsc);

    const ascDescKeys = ['no', '-key'];
    const expectedAscDesc = [
      { key: 'dbghjh', no: 1 },
      { key: 'va', no: 234 },
      { key: 'gaga', no: 8765 },
      { key: 'aaa', no: 8765 },
      { key: 'aaa', no: 8765 },
    ];
    expect(pipe.transform(multiArray, ascDescKeys)).toEqual(expectedAscDesc);

    const descKeys = ['-no', '-key'];
    const expectedDesc = [
      { key: 'gaga', no: 8765 },
      { key: 'aaa', no: 8765 },
      { key: 'aaa', no: 8765 },
      { key: 'va', no: 234 },
      { key: 'dbghjh', no: 1 },
    ];
    expect(pipe.transform(multiArray, descKeys)).toEqual(expectedDesc);
  });
});
