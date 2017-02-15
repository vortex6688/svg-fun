import { browser, by, element } from 'protractor';

describe('Admin', () => {

  beforeEach(() => {
    browser.get('/admin');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Type Network';
    expect(subject).toEqual(result);
  });

  it('should have <admin-home>', () => {
    let subject = element(by.css('admin-home')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });
});
