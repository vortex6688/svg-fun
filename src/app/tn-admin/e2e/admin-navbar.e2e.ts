import { browser, by, element } from 'protractor';

describe('Admin:Navbar', () => {

  beforeEach(() => {
    browser.get('/admin');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Type Network';
    expect(subject).toEqual(result);
  });

  it('should display the login icon', () => {
    let loginIcon = element(by.css('.login-icon'));
    expect(loginIcon).toBeTruthy();
  });

  it('should display the login modal form after clicking the login icon', () => {
    element(by.css('.login-icon')).click();
    let modalBody = element(by.css('.modal-body'));
    expect(modalBody).toBeTruthy();
  });

});
