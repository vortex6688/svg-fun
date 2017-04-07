import { browser, by, element } from 'protractor';

describe('Admin:Login-Modal', () => {

  beforeEach(() => {
    browser.get('/admin');
    element(by.css('.login-icon')).click();
  });

  it('should display the login form with input fields and sign in button', () => {
    expect(element(by.tagName('form'))).toBeTruthy();
    expect(element(by.css('form input[name=username]'))).toBeTruthy();
    expect(element(by.css('form input[name=password]'))).toBeTruthy();
    expect(element(by.css('a.btn.btn-success'))).toBeTruthy();
  });

  it('should display an error when user attempts to log in with incorrect credentials', () => {
    let email = element(by.css('form input[name=username]'));
    let password = element(by.css('form input[name=password]'));
    let submit = element(by.css('a.btn.btn-success'));
    email.sendKeys('incorrect@email.com');
    password.sendKeys('incorrectPassword');
    submit.click();
    expect(element(by.css('error'))).toBeTruthy();
  });

/*
 * @todo: Mock the response in order to test this.
 *
  it('should login when user provides correct credentials', () => {
    let email = element(by.css('form input[name=username]'));
    let password = element(by.css('form input[name=password]'));
    let submit = element(by.css('a.btn.btn-success'));
    email.sendKeys('correct@email.com');
    password.sendKeys('correctPassword');
    submit.click();
  });
*/
});
