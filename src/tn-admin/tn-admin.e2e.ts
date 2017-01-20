import { browser, by, element } from 'protractor';

describe('Admin', () => {

  beforeEach(() => {
    browser.get('/admin/');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'This is the admin half!!!';
    expect(subject).toEqual(result);
  });

  it('should have header', () => {
    let subject = element(by.css('h1')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });

  it('should have <home>', () => {
    let subject = element(by.css('tn-admin home')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });

  it('should have buttons', () => {
    let subject = element(by.css('button')).getText();
    let result  = 'Submit Value';
    expect(subject).toEqual(result);
  });

});
