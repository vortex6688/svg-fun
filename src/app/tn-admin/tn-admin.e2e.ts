import { browser, by, element } from 'protractor';

describe('Admin', () => {
  const testUser = {
    username: 'customerb@typenetwork.com',
    password: 'password',
  };

  beforeAll(() => {
    // make window full screen so nav items are not hidden behind navbar collapse.
    browser.driver.manage().window().maximize();
    browser.get('/admin');
  });

  it('should have a title', () => {
    return browser.getTitle().then((subject) => {
      const result  = 'TN Admin | Orders List';
      expect(subject).toEqual(result);
    });
  });

  it('should have <admin>', () => {
    return element(by.css('admin')).isPresent().then((subject) => {
      const result  = true;
      expect(subject).toEqual(result);
    });
  });

  it('should have <admin-navbar>', () => {
    return element(by.css('admin-navbar')).isPresent().then((subject) => {
      const result  = true;
      expect(subject).toEqual(result);
    });
  });

  it('should have a Login link', () => {
     const login = element(by.css('admin-navbar .login'));
     expect(login).toBeTruthy();
  });

  it('users can click the login link to reveal the login modal', () => {
    const login = element(by.css('admin-navbar .login'));
    login.click();
    const loginModal = element(by.css('app-login'));
    expect(loginModal).toBeTruthy();
  });

  it('logging in with invalid credentials displays an error', () => {
    const loginModal = element(by.css('app-login'));
    const username = loginModal.element(by.name('username'));
    username.sendKeys('incorrect@email.com');
    const password = loginModal.element(by.name('password'));
    password.sendKeys('incorrectPassword');

    const submit = loginModal.element(by.css('button.btn.btn-success'));
    submit.click();
    expect(loginModal.element(by.css('error'))).toBeTruthy();

    username.clear();
    password.clear();

  });

  // Disabled for CI until we have a server for our CI environment.
  if (!process.env.CI) {
    it('should not display any orders when not logged in', () => {
      element(by.css('order-row')).isPresent().then((present) => {
        expect(present).toBeFalsy();
      });
    });

    it('logging in with valid credentials closes the login dialog', () => {
      const loginModal = element(by.css('app-login'));
      const username = loginModal.element(by.name('username'));
      username.clear().then(() => {
        username.sendKeys(testUser.username);
      });
      const password = loginModal.element(by.name('password'));
      password.clear().then(() => {
        password.sendKeys(testUser.password);
      });
      const submit = loginModal.element(by.css('.btn.login'));
      submit.click();
      // there has to be a better way to wait on the http response.
      browser.driver.sleep(1000);

      element(by.css('app-login')).isPresent().then((present) => {
        expect(present).toBeFalsy();
      });
    });

    it('username is displayed in the navbar when logged in', () => {
      const logout = element(by.css('admin-navbar .logout'));
      expect(logout).toBeTruthy();
      logout.getText().then((text) => {
        expect(text).toEqual(`Logout ${testUser.username}`);
      });
    });

    it('users remain logged in after a page reload', () => {
      browser.get('/admin');
      const logout = element(by.css('admin-navbar .logout'));
      expect(logout).toBeTruthy();
      logout.getText().then((text) => {
        expect(text).toEqual(`Logout ${testUser.username}`);
      });
    });

    it('should display orders when logged in', () => {
      element(by.css('order-row')).isPresent().then((present) => {
        expect(present).toBeTruthy();
      });
    });

    describe('Order list collapsing', () => {
      it('should allow collapsing single orders', () => {
        const order = element.all(by.css('order-row')).get(2);
        const orderData = order.element(by.css('table'));

        expect(orderData.isDisplayed()).toBeFalsy();

        // Open collapsed
        order.element(by.css('tr:nth-child(1) .col:nth-child(1)')).click();
        expect(orderData.isDisplayed()).toBeTruthy();

        // Collapse
        order.element(by.css('tr:nth-child(1) .col:nth-child(1)')).click();
        expect(orderData.isDisplayed()).toBeFalsy();
      });

      it('should allow collapsing all orders', () => {
        // Open all collapsed
        element(by.css('orders-table > div > div:last-child > div:first-child span:first-child')).click();
        element.all(by.css('order-row')).each((order) => {
          expect(order.element(by.css('table')).isDisplayed()).toBeTruthy();
        });

        // Collapse all
        element(by.css('orders-table > div > div:last-child > div:first-child span:last-child')).click();
        element.all(by.css('order-row')).each((order, index) => {
          expect(order.element(by.css('table')).isDisplayed()).toBeFalsy();
        });
      });
    });

    describe('Order list search', () => {
      // Clear filters
      afterEach(() => {
        element(by.css('orders-controls .card-block:nth-child(2) span.row small a')).click();
        element(by.css('orders-controls .card-block:nth-child(3) span.row small a')).click();
      });

      it('should be able to search for orders by id', () => {
        const targetId = '4';
        const orderControls = element(by.css('orders-controls'));
        const idField = orderControls.element(by.css('input[formControlName=id]'));

        element.all(by.css('order-row')).then((orders) => {
          expect(orders.length).toBeGreaterThan(1);
        });
        idField.sendKeys(targetId);

        // Wait for debounce
        browser.driver.sleep(500);

        element.all(by.css('order-row')).then((orders) => {
          const order = orders[0].element(by.css('tr:nth-child(1) .col:nth-child(1)'));
          expect(orders.length).toBe(1);
          expect(order.getText()).toEqual(targetId);
        });
      });

      it('should be able to filters orders by status', () => {
        const targetStatus = ['Paid in Full', 'Pending'];
        const orderControls = element(by.css('orders-controls'));
        const statusFilters = orderControls.element(by.css('fieldset:last-child'));
        statusFilters.element(by.css('li:nth-child(1) label')).click();
        statusFilters.element(by.css('li:nth-child(2) label')).click();

        // Wait for debounce
        browser.driver.sleep(500);

        let valid = true;
        element.all(by.css('order-row')).each((order) => {
          order.element(by.css('tr:nth-child(1) .col:nth-child(5)')).getText().then((status) => {
            if (targetStatus.indexOf(status) === -1) {
              valid = false;
              return;
            }
          });
        }).then(() => {
          expect(valid).toBeTruthy();
        });
      });
    });

    describe('Order list sorting', () => {
      it('should be able to sort orders descendingly', () => {
        const amountHeader = element(by.css('.table-sortable .col.sortable:nth-child(3)'));
        amountHeader.click();
        expect(amountHeader.getAttribute('class')).toContain('sort-desc');
        let highest = Infinity;
        let sorted = true;
        element.all(by.css('order-row')).each((order) => {
          order.element(by.css('tr:nth-child(1) .col:nth-child(3)')).getText().then((amount) => {
            const amountNo = +amount.slice(1).replace(',', '');
            if (highest < amountNo) {
              sorted = false;
              return;
            }
            highest = amountNo;
          });
        }).then(() => {
          expect(sorted).toBeTruthy();
        });
      });

      it('should be able to sort orders ascendingly', () => {
        const amountHeader = element(by.css('.table-sortable .col.sortable:nth-child(3)'));
        amountHeader.click();
        expect(amountHeader.getAttribute('class')).toContain('sort-asc');
        let highest = 0;
        let sorted = true;
        element.all(by.css('order-row')).each((order) => {
          order.element(by.css('tr:nth-child(1) .col:nth-child(3)')).getText().then((amount) => {
            const amountNo = +amount.slice(1).replace(',', '');
            if (highest >  amountNo) {
              sorted = false;
              return;
            }
            highest = amountNo;
          });
        }).then(() => {
          expect(sorted).toBeTruthy();
        });
      });
    });
  }
});
