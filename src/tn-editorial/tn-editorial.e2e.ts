import { browser, by, element } from 'protractor';

describe('Editorial', () => {

  beforeEach(() => {
    browser.get('/editorial/');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'This is the editorial half!!!';
    expect(subject).toEqual(result);
  });

  it('should have header', () => {
    let subject = element(by.css('h1')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });

  it('should have <home>', () => {
    let subject = element(by.css('tn-editorial home')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });

  it('should have buttons', () => {
    let subject = element(by.css('button')).getText();
    let result  = 'Submit Value';
    expect(subject).toEqual(result);
  });

});
