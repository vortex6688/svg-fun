import { browser, by, element } from 'protractor';

describe('Admin', () => {

  beforeEach(() => {
    browser.get('/admin');
  });

  it('should have a title', () => {
    let request = browser.getTitle();
    return request.then((subject) => {
      let result  = 'Type Network';
      expect(subject).toEqual(result);
    });
  });

  it('should have <admin>', () => {
    let request = element(by.css('admin')).isPresent();
    request.then((subject) => {
      let result  = true;
      expect(subject).toEqual(result);
    });
  });
});
