import { browser, by, element } from 'protractor';

describe('Admin', () => {

  beforeAll(() => {
    browser.get('/admin');
    // do we need to wipe localstorage to ensure we do not have a user
    // session.
  });

  it('should have a title', () => {
    return browser.getTitle().then((subject) => {
      let result  = 'Type Network';
      expect(subject).toEqual(result);
    });
  });

  it('should have <admin>', () => {
    return element(by.css('admin')).isPresent().then((subject) => {
      let result  = true;
      expect(subject).toEqual(result);
    });
  });

  it('should have <admin-navbar>', () => {
    return element(by.css('admin-navbar')).isPresent().then((subject) => {
      let result  = true;
      expect(subject).toEqual(result);
    });
  });

  it('logging in with invalid credentials displays an error', () => {
    // we should start out unauthenticated.
    let loginModalButton = element(by.css('admin-navbar .login'));
    expect(loginModalButton).toBeTruthy();
    loginModalButton.click();

    let loginModal = element(by.css('app-login'));
    expect(loginModal).toBeTruthy();

    loginModal.element(by.name);

    let email = loginModal.element(by.name('username'));
    email.sendKeys('incorrect@email.com');
    let password = loginModal.element(by.name('password'));
    password.sendKeys('incorrectPassword');

    let submit = loginModal.element(by.css('a.btn.btn-success'));
    submit.click();
    expect(element(by.css('error'))).toBeTruthy();
  });
});
