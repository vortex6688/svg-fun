import { browser, by, element } from 'protractor';

describe('Editorial', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('should have a title', () => {
    return browser.getTitle().then((subject) => {
      let result  = 'Type Network';
      expect(subject).toEqual(result);
    });
  });

  it('should have header', () => {
    return element(by.css('h3')).isPresent().then((subject) => {
      let result  = true;
      expect(subject).toEqual(result);
    });
  });

  it('should have <home>', () => {
    return element(by.css('home')).isPresent().then((subject) => {
      let result  = true;
      expect(subject).toEqual(result);
    });
  });

  it('should have buttons', () => {
    return element(by.css('button')).getText().then((subject) => {
      let result  = 'Submit Value';
      expect(subject).toEqual(result);
    });
  });

});
