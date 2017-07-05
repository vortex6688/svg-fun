import { browser, by, element } from 'protractor';

describe('Admin', () => {
  const testUser = {
    username: 'superuser@typenetwork.com',
    password: 'password',
  };

  beforeAll(() => {
    // make window full screen so nav items are not hidden behind navbar collapse.
    browser.driver.manage().window().maximize();
    browser.get('/admin');
  });

  it('should have a title', () => {
    return browser.getTitle().then((subject) => {
      const result  = 'TN Admin | Login';
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

    it('logging in with valid credentials redirects to order page', () => {
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

      expect(element(by.css('app-login')).isPresent()).toBeFalsy();
      browser.getCurrentUrl().then((url) => {
        expect(url.indexOf('admin/orders/orders')).toBeGreaterThan(-1);
      });
    });

    describe('Logged in', () => {
      beforeAll(() => {
        const logout = element(by.css('admin-navbar .logout')).isPresent().then((loggedIn) => {
          if (loggedIn) { return; }

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
          browser.refresh();
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
        browser.refresh();
        const logout = element(by.css('admin-navbar .logout'));
        expect(logout).toBeTruthy();
        logout.getText().then((text) => {
          expect(text).toEqual(`Logout ${testUser.username}`);
        });
      });

      it('should display orders when logged in', () => {
        expect(element(by.css('order-row')).isPresent()).toBeTruthy();
      });

      describe('Order page', () => {
        describe('list collapsing', () => {
          it('should allow opening collapsed single orders', () => {
            element(by.css('order-row:first-child tr:nth-child(1) .col:nth-child(1)')).click().then(() => {
              expect(element(by.css('order-row:first-child table')).isDisplayed()).toBeTruthy();
            });
          });

          it('should allow collapsing open single orders', () => {
            element(by.css('order-row:first-child tr:nth-child(1) .col:nth-child(1)')).click().then(() => {
              expect(element(by.css('order-row:first-child table')).isDisplayed()).toBeFalsy();
            });
          });

          it('should allow opening all collapsed orders', () => {
            element(by.css('orders-table > div > div:last-child > div:first-child span:first-child'))
            .click().then(() => {
              element.all(by.css('order-row')).each((order) => {
                expect(order.element(by.css('table')).isDisplayed()).toBeTruthy();
              });
            });
          });

          it('should allow collapsing all orders', () => {
            element(by.css('orders-table > div > div:last-child > div:first-child span:last-child'))
            .click().then(() => {
              element.all(by.css('order-row')).each((order) => {
                expect(order.element(by.css('table')).isDisplayed()).toBeFalsy();
              });
            });
          });
        });

        describe('list search', () => {
          // Clear filters
          afterEach(() => {
            element(by.css('orders-controls .card-block:nth-child(2) span.row small a')).click();
            element(by.css('orders-controls .card-block:nth-child(3) span.row small b')).click();
          });

          it('should be able to search for orders by id', () => {
            const targetId = '4';
            const orderControls = element(by.css('orders-controls'));
            const idField = orderControls.element(by.css('input[formControlName=id]'));

            element.all(by.css('order-row')).then((orders) => {
              expect(orders.length).toBeGreaterThan(1);

              idField.sendKeys(targetId);
              // Wait for debounce
              browser.driver.sleep(500);
              element.all(by.css('order-row')).then((filteredOrders) => {
                const order = filteredOrders[0].element(by.css('tr:nth-child(1) .col:nth-child(1)'));
                expect(filteredOrders.length).toBe(1);
                expect(order.getText()).toEqual(targetId);
              });
            });
          });

          it('should be able to filters orders by status', () => {
            const targetStatus = ['Paid in Full', 'Pending'];
            const orderControls = element(by.css('orders-controls'));
            const statusFilters = orderControls.element(by.css('fieldset:last-child'));
            statusFilters.element(by.css('li:nth-child(2) label')).click();
            statusFilters.element(by.css('li:nth-child(3) label')).click();

            // Wait for debounce
            browser.driver.sleep(500);

            let valid = true;
            element.all(by.css('order-row')).each((order) => {
              return order.element(by.css('tr:nth-child(1) .col:nth-child(5)')).getText().then((status) => {
                if (targetStatus.indexOf(status) === -1) {
                  valid = false;
                  return;
                }
              });
            }).then(() => {
              expect(valid).toBeTruthy();
            });
          });

          it('should be able to search for orders by family', () => {
            const family = 'Zócalo';
            const orderControls = element(by.css('orders-controls'));
            const fontField = orderControls.element(by.css('input[formcontrolname=font]'));
            fontField.sendKeys(family);
            // Wait for debounce
            browser.driver.sleep(500);
            element.all(by.css('order-row')).each((order) => {
              expect(order.element(by.cssContainingText('tr:last-child tbody td:first-child li', family))).toBeTruthy();
            });
          });
        });

        describe('list sorting', () => {
          it('should be able to sort orders descendingly', () => {
            const amountHeader = element(by.css('.table-sortable .col.sortable:nth-child(3)'));
            amountHeader.click();
            expect(amountHeader.getAttribute('class')).toContain('sort-desc');
            let highest = Infinity;
            let sorted = true;
            element.all(by.css('order-row')).each((order) => {
              return order.element(by.css('tr:nth-child(1) .col:nth-child(3)')).getText().then((amount) => {
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
              return order.element(by.css('tr:nth-child(1) .col:nth-child(3)')).getText().then((amount) => {
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

        describe('Opening order edit modal', () => {
          beforeAll(() => {
            const expandOrderEditIcon = element(by.css('order-row:first-child tr:nth-child(1) .col:nth-child(1)'));
            expandOrderEditIcon.click();
            const expandOrderEditButton = element(by.css('order-row .table thead:first-child button'));
            expandOrderEditButton.click();
          });

          it('order edit modal should be revealed after clicking on the expanded row with the order details', () => {
            expect(element(by.css('app-admin-order-edit')).isDisplayed()).toBeTruthy();
          });

          it('order edit modal should have a cancel button that closes the modal', () => {
            const closeButton = element(by.css('app-admin-order-edit .modal-action-bar .btn-info'));
            closeButton.getText().then((text) => {
              expect(text).toEqual('Cancel');
            });
            closeButton.click().then(() => {
              expect(element(by.css('app-admin-order-edit')).isPresent()).toBeFalsy();
            });
          });
        });
      });

      describe('Family page', () => {
        describe('Family list sorting', () => {
          beforeAll(() => {
            browser.get('/admin/products/families');
          });

          it('should be able to sort families descendingly', () => {
            const amountHeader = element(by.css('.table-sortable .col.sortable:nth-child(3)'));
            amountHeader.click();
            expect(amountHeader.getAttribute('class')).toContain('sort-desc');
            let highest = Infinity;
            let sorted = true;
            element.all(by.css('order-row')).each((order) => {
              return order.element(by.css('tr:nth-child(1) .col:nth-child(3)')).getText().then((amount) => {
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

          it('should be able to sort families ascendingly', () => {
            const amountHeader = element(by.css('.table-sortable .col.sortable:nth-child(3)'));
            amountHeader.click();
            expect(amountHeader.getAttribute('class')).toContain('sort-asc');
            let highest = 0;
            let sorted = true;
            element.all(by.css('family-row')).each((order) => {
              return order.element(by.css('tr:nth-child(1) .col:nth-child(3)')).getText().then((amount) => {
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

        describe('Opening single family edit modal', () => {
          beforeAll(() => {
            const familySingleEditButton = element(by.css('.table-sortable tbody button'));
            familySingleEditButton.click();
          });

          it('single family edit modal should be revealed after clicking the edit botton', () => {
            expect(element(by.css('app-admin-family-single-edit')).isDisplayed()).toBeTruthy();
          });

          it('single family edit modal should have a discard button that closes the modal', () => {
            const closeButton = element(by.css('app-admin-family-single-edit .modal-action-bar .btn-danger'));
            closeButton.getText().then((text) => {
              expect(text).toEqual('Discard');
            });
            closeButton.click().then(() => {
              expect(element(by.css('app-admin-family-single-edit')).isPresent()).toBeFalsy();
            });
          });
        });

        describe('Opening family batch edit modal', () => {
          beforeAll(() => {
            const familyBatchEditButton = element(by.css('families-table button'));
            familyBatchEditButton.click();
          });

          it('batch family edit modal should be revealed after clicking the edit botton', () => {
            expect(element(by.css('app-admin-family-batch-edit')).isDisplayed()).toBeTruthy();
          });

          it('batch family edit modal should have a discard button that closes the modal', () => {
            const closeButton = element(by.css('app-admin-family-batch-edit .modal-action-bar .btn-danger'));
            closeButton.getText().then((text) => {
              expect(text).toEqual('Discard');
            });
            closeButton.click().then(() => {
              expect(element(by.css('app-admin-family-batch-edit')).isPresent()).toBeFalsy();
            });
          });
        });
      });

      describe('Series list sorting', () => {
        beforeAll(() => {
          browser.get('/admin/products/series');
        });
        it('should be able to sort series descendingly', () => {
          const amountHeader = element(by.css('.table-sortable .col.sortable:nth-child(5)'));
          amountHeader.click();
          expect(amountHeader.getAttribute('class')).toContain('sort-desc');
          let highest = Infinity;
          let sorted = true;
          element.all(by.css('series-row')).each((order) => {
            return order.element(by.css('tr:nth-child(1) .col:nth-child(5)')).getText().then((amount) => {
              const amountNo = +amount;
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

        it('should be able to sort series ascendingly', () => {
          const amountHeader = element(by.css('.table-sortable .col.sortable:nth-child(5)'));
          amountHeader.click();
          expect(amountHeader.getAttribute('class')).toContain('sort-asc');
          let highest = 0;
          let sorted = true;
          element.all(by.css('order-row')).each((order) => {
            return order.element(by.css('tr:nth-child(1) .col:nth-child(5)')).getText().then((amount) => {
              const amountNo = +amount;
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

      describe('Customers list page', () => {
        beforeAll(() => {
          browser.get('/admin/orders/customers');
        });
        it('should show customers list page', () => {
          expect(element(by.css('admin-customers-list')).isDisplayed()).toBeTruthy();
        });
        it('should have a table with customers info', () => {
          expect(element(by.css('admin-customers-list customers-table')).isDisplayed()).toBeTruthy();
        });

        describe('Opening single customer edit modal', () => {
          beforeAll(() => {
            const expandCustomerEditIcon = element(by.css('customers-row:first-child tr:first-child .col:first-child'));
            expandCustomerEditIcon.click();
            const customerSingleEditButton = element(by.css('.table-sortable tbody button'));
            customerSingleEditButton.click();
          });

          it('single customer edit modal should be revealed after clicking the edit botton', () => {
            expect(element(by.css('app-admin-customer-single-edit')).isDisplayed()).toBeTruthy();
          });

          it('single customer edit modal should have a cancel button that closes the modal', () => {
            const closeButton = element(by.css('app-admin-customer-single-edit .modal-action-bar .btn-info'));
            closeButton.getText().then((text) => {
              expect(text).toEqual('Cancel');
            });
            closeButton.click().then(() => {
              expect(element(by.css('app-admin-customer-single-edit')).isPresent()).toBeFalsy();
            });
          });
        });
      });

      describe('Style page', () => {
        describe('Style list sorting', () => {
          beforeAll(() => {
            browser.get('/admin/products/styles');
          });

          it('should be able to sort styles descendingly', () => {
            const amountHeader = element(by.css('.table-sortable .col.sortable:nth-child(3)'));
            amountHeader.click();
            expect(amountHeader.getAttribute('class')).toContain('sort-desc');
            let highest = Infinity;
            let sorted = true;
            element.all(by.css('order-row')).each((order) => {
              return order.element(by.css('tr:nth-child(1) .col:nth-child(3)')).getText().then((amount) => {
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

          it('should be able to sort styles ascendingly', () => {
            const amountHeader = element(by.css('.table-sortable .col.sortable:nth-child(3)'));
            amountHeader.click();
            expect(amountHeader.getAttribute('class')).toContain('sort-asc');
            let highest = 0;
            let sorted = true;
            element.all(by.css('family-row')).each((order) => {
              return order.element(by.css('tr:nth-child(1) .col:nth-child(3)')).getText().then((amount) => {
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
      });
    });
  }
});
