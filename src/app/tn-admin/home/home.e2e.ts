import { browser, by, element } from 'protractor';

describe('Admin:Home', () => {

  beforeEach(() => {
    // change hash depending on router LocationStrategy
    browser.get('admin/home');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Type Network';
    expect(subject).toEqual(result);
  });
});
