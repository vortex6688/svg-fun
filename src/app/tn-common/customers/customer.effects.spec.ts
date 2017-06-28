import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { TestBed, inject } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import { CustomerService } from './customer.service';
import { CustomerActions } from './customer.actions';
import { CustomerEffects } from './customer.effects';
import { Customer } from './customer.model';
import { initialCustomerState } from './customer.state';

describe('CustomerEffects', () => {
  const customerMock: Customer = {
    id: 10,
    email: 'jane@doe.com',
    username: 'jane@doe.com',
    first_name: 'Jane',
    last_name: 'Doe',
    address1: 'Address1',
    address2: 'Address2',
    state: 'State',
    city: 'Towntate',
    zipcode: 'Zippity zoopity',
    country: 'World',
    company: 'True company',
    website: 'http://site.io',
    phone: '1234567',
    is_active: true,
    is_verified: true,
    is_superuser: false,
    is_staff: false,
    can_invoice: true,
    tax_exempt: true,
    created_at: Date.now(),
    updated_at: Date.now(),
  };

  const mockCustomers = [
    { ...customerMock, id: 12345 },
    { ...customerMock, id: 234543123 },
  ];
  let runner: EffectsRunner;
  let customerEffects: CustomerEffects;
  let customerActions: CustomerActions;
  let customerService: MockCustomerService;

  class MockCustomerService {
    public getAllPages(query: object): Observable<Customer[]> {
      return Observable.of(mockCustomers);
    }
    public save(customer: Customer): Observable<Customer> {
      return Observable.of(customer);
    }
    public delete(customer: Customer): Observable<Customer> {
      return Observable.of(customer);
    }
  }
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      CustomerActions,
      CustomerEffects,
      {
        provide: CustomerService,
        useClass: MockCustomerService,
      },
    ]
  }));

  beforeEach(() => {
    runner = TestBed.get(EffectsRunner);
    customerActions = TestBed.get(CustomerActions);
    customerEffects = TestBed.get(CustomerEffects);
    customerService = TestBed.get(CustomerService);
  });

  describe('loadCustomers$', () => {
    it('should return loadCustomersSuccess on load success', () => {
      const expectedResult = customerActions.loadCustomersSuccess(mockCustomers);
      runner.queue(customerActions.loadCustomers());

      let result = null;
      customerEffects.loadCustomers$.subscribe((data) => result = data);
      expect(result).toEqual(expectedResult);
    });

    it('should return loadCustomersFail on load failure', () => {
      const errorValue = 'error';
      spyOn(customerService, 'getAllPages').and.returnValue(Observable.throw(errorValue));
      runner.queue(customerActions.loadCustomers());
      customerEffects.loadCustomers$.subscribe((result) => {
        expect(result).toEqual(customerActions.loadCustomersFail(errorValue));
      });
    });
  });

  describe('createCustomer$', () => {
    it('should return a createCustomerSuccess, with the customer, on success add', () => {
      runner.queue(customerActions.createCustomer(customerMock));
      customerEffects.createCustomer$.subscribe((result) => {
        expect(result).toEqual(customerActions.createCustomerSuccess(customerMock));
      });
    });

    it('should return a createCustomerFail action, on service error', () => {
      spyOn(customerService, 'save').and.returnValue(Observable.throw('error'));
      runner.queue(customerActions.createCustomer(customerMock));
      customerEffects.createCustomer$.subscribe((result) => {
        expect(result).toEqual(customerActions.createCustomerFail(customerMock));
      });
    });
  });

  describe('updateCustomer$', () => {
    it('should return a updateCustomerSuccess action, with the customer, on success update', () => {
      runner.queue(customerActions.updateCustomer(customerMock));
      customerEffects.updateCustomer$.subscribe((result) => {
        expect(result).toEqual(customerActions.updateCustomerSuccess(customerMock));
      });
    });

    it('should return a updateCustomerFail action, on service error', () => {
      spyOn(customerService, 'save').and.returnValue(Observable.throw('error'));
      runner.queue(customerActions.updateCustomer(customerMock));
      customerEffects.updateCustomer$.subscribe((result) => {
        expect(result).toEqual(customerActions.updateCustomerFail(customerMock));
      });
    });
  });

  describe('removeCustomer$', () => {
    it('should return a removeCustomerSuccess action, with the customer, on success remove', () => {
      runner.queue(customerActions.removeCustomer(customerMock));
      customerEffects.removeCustomer$.subscribe((result) => {
        expect(result).toEqual(customerActions.removeCustomerSuccess(customerMock));
      });
    });

    it('should return a removeCustomerFail, on service error', () => {
      spyOn(customerService, 'delete').and.returnValue(Observable.throw('error'));
      runner.queue(customerActions.removeCustomer(customerMock));
      customerEffects.removeCustomer$.subscribe((result) => {
        expect(result).toEqual(customerActions.removeCustomerFail(customerMock));
      });
    });
  });
});
