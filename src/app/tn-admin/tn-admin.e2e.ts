import { browser, by, element } from 'protractor';

describe('Admin', () => {

  beforeAll(() => {
    // make window full screen so nav items are not hidden behind navbar collapse.
    browser.driver.manage().window().maximize();
    browser.get('/admin');
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

  it('should have a Login link', () => {
     let login = element(by.css('admin-navbar .login'));
     expect(login).toBeTruthy();
  });

  it('users can click the login link to reveal the login modal', () => {
    let login = element(by.css('admin-navbar .login'));
    login.click();
    let loginModal = element(by.css('app-login'));
    expect(loginModal).toBeTruthy();
  });

  it('logging in with invalid credentials displays an error', () => {
    let loginModal = element(by.css('app-login'));
    let username = loginModal.element(by.name('username'));
    username.sendKeys('incorrect@email.com');
    let password = loginModal.element(by.name('password'));
    password.sendKeys('incorrectPassword');

    let submit = loginModal.element(by.css('a.btn.btn-success'));
    submit.click();
    expect(loginModal.element(by.css('error'))).toBeTruthy();

    username.clear();
    password.clear();

  });

  // Commented out until we have a server for our CI environment.
  // maybe we can put a test user in master-api, until we get
  // dockerized.

  // it('logging in with valid credentials closes the login dialog', () => {
  //   let loginModal = element(by.css('app-login'));
  //   let username = loginModal.element(by.name('username'));
  //   username.clear().then(() => {
  //     username.sendKeys('darrel.opry@spry-group.com');
  //   });
  //   let password = loginModal.element(by.name('password'));
  //   password.clear().then(() => {
  //     password.sendKeys('test');
  //   });

  //   let submit = loginModal.element(by.css('.btn.login'));
  //   submit.click();
  //   // there has to be a better way to wait on the http response.
  //   browser.driver.sleep(1000);

  //   element(by.css('app-login')).isPresent().then((present) => {
  //     expect(present).toBeFalsy();
  //   });
  // });

  // it('username is displayed in the navbar when logged in', () => {
  //   let logout = element(by.css('admin-navbar .logout'));
  //   expect(logout).toBeTruthy();
  //   logout.getText().then((text) => {
  //     expect(text).toEqual('Logout darrel.opry@spry-group.com');
  //   })
  // });

  // it('users remain logged in after a page reload', () => {
  //   browser.get('/admin');
  //   let logout = element(by.css('admin-navbar .logout'));
  //   expect(logout).toBeTruthy();
  //   logout.getText().then((text) => {
  //     expect(text).toEqual('Logout darrel.opry@spry-group.com');
  //   })
  // });


});
