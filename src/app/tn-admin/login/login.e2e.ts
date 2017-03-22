import { browser, by, element } from 'protractor';

describe('Admin:Login-Modal', () => {

  beforeEach(() => {
    browser.get('/admin');
    element(by.css('.login-icon')).click();
  });

  it('should display the modal title', () => {
    let subject = element(by.css('.modal-title'));
    expect(subject).toBeTruthy();
  });

  it('should display the login form', () => {
    let subject = element(by.tagName('form'));
    expect(subject).toBeTruthy();
  });

  it('should display input elements', () => {
    let subject = element.all(by.tagName('input'));
    expect(subject).toBeTruthy();
  });

  it('should display the sign in button', () => {
    let subject = element(by.css('a btn btn-success'));
    expect(subject).toBeTruthy();
  });

});
