import { browser, by, element } from 'protractor';

describe('Editorial:Home', () => {

  beforeEach(() => {
    // change hash depending on router LocationStrategy
    browser.get('editorial/#/home');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Home · Type Network';
    expect(subject).toEqual(result);
  });
});
