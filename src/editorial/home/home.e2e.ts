import { browser, by, element } from 'protractor';

describe('Editorial:Home', () => {

  beforeEach(() => {
    // change hash depending on router LocationStrategy
    browser.get('editorial/#/home');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'This is the editorial half!!!';
    expect(subject).toEqual(result);
  });

  it('should have `your content here` x-large', () => {
    let subject = element(by.css('[x-large]')).getText();
    let result  = 'Your Content Here';
    expect(subject).toEqual(result);
  });

});
