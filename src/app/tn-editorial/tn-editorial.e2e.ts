import { browser, by, element } from 'protractor';

describe('Editorial', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('should have a title', () => {
    return browser.getTitle().then((subject) => {
      const result  = 'Type Network';
      expect(subject).toEqual(result);
    });
  });

  it('should have header', () => {
    return element(by.css('h3')).isPresent().then((subject) => {
      const result  = true;
      expect(subject).toEqual(result);
    });
  });

  it('should have <home>', () => {
    return element(by.css('home')).isPresent().then((subject) => {
      const result  = true;
      expect(subject).toEqual(result);
    });
  });
});
