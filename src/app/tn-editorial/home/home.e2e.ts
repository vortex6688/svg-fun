import { browser, by, element } from 'protractor';

describe('Editorial:Home', () => {

  beforeEach(() => {
    // change hash depending on router LocationStrategy
    browser.get('/home');
  });

  it('should have a title', () => {
    return browser.getTitle().then((subject) => {
      expect(subject).toEqual('Type Network');
    });
  });
});
