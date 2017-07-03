import {
  inject,
  async,
} from '@angular/core/testing';

import { Customer } from './customer.model';
import { CustomerReducer } from './customer.reducer';
import { CustomerActions } from './customer.actions';
import { CustomerState, CustomerSearch, initialCustomerState } from './customer.state';
import {
getEntities,
  getIds,
  getSelectedId,
  getSelected,
  getAll,
  getSearchQuery,
  getCustomerById,
  getCustomerByName,
  getCustomerByEmail,
  getCustomersByCity,
  getCustomersByCountry,
  getCustomersByActivity,
} from './customer.selectors';

const CustomerMock: Customer = {
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
const addItems: Customer[] = [{
  ...CustomerMock,
  id: 11,
  first_name: 'name',
  email: 'email',
  city: 'nan',
  country: 'another',
}, {
  ...CustomerMock,
  id: 1,
  first_name: 'another name',
  email: 'email2',
  is_active: false,
  city: 'test',
  country: 'no country',
}, {
  ...CustomerMock,
  id: 2,
  first_name: 'more names',
  email: 'email3',
  is_active: false,
  city: 'hurgzestan',
  country: 'woosh',
}];
const addedData = {
  ids: addItems.map((item) => item.id),
  entities: addItems.reduce((result, item) => ({ ... result, [item.id]: item }), {}),
};
const nonEmptyState: CustomerState = {
  ...addedData,
  selectedCustomerId: null,
  search: initialCustomerState.search,
};

describe('CustomerReducer', () => {
  const mockedState = (results = []): CustomerState => (initialCustomerState);

  const customerActions = new CustomerActions();

  it('should return current state when no valid actions have been made', () => {
    const state = mockedState();
    const actual = CustomerReducer(state, { type: 'INVALID_ACTION' });
    const expected = state;
    expect(actual).toEqual(expected);
  });

  it('should CREATE_CUSTOMER_SUCCESS create a new customer', () => {
    const state = mockedState();
    const actual = CustomerReducer(state, customerActions.createCustomerSuccess(CustomerMock));
    const expected = {
      ids: [...state.ids, ...[CustomerMock.id]],
      entities: Object.assign({}, state.entities, { [CustomerMock.id]: CustomerMock }),
      selectedCustomerId: CustomerMock.id,
      search: state.search,
    };
    expect(actual).toEqual(expected);
  });

  it('should return state on CREATE_CUSTOMER_FAIL', () => {
    const state = mockedState();
    const createdItem = { ...CustomerMock, id: 23456 };
    const actual = CustomerReducer(state, customerActions.updateCustomerFail(createdItem));
    expect(actual).toEqual(state);
  });

  it('should GET_CUSTOMERs when there is no Customer on the state', () => {
    const state = mockedState();
    const actual = CustomerReducer(state, customerActions.getCustomers());
    const expected = {
      ids: [],
      entities: {},
      selectedCustomerId: null,
      search: initialCustomerState.search,
    };
    expect(actual).toEqual(expected);
  });

  it('should update search object on SEARCH_QUERY', () => {
    const state = mockedState();
    const search: CustomerSearch = {
      name: 'fam fam',
      email: 'email@mail.m',
      city: ['town'],
      country: ['world'],
    };
    const actual = CustomerReducer(state, customerActions.searchQuery(search));
    const expected: CustomerState = {
      ...initialCustomerState,
      search,
    };
    expect(actual).toEqual(expected, 'Didn\'t update search query correctly');
  });

  it('should add customers on LOAD_CUSTOMERS_SUCCESS', () => {
    const state = mockedState();
    const actual = CustomerReducer(state, customerActions.loadCustomersSuccess(addItems));
    const expected: CustomerState = nonEmptyState;
    expect(actual).toEqual(expected, 'Didn\'t add new customers');
  });

  describe('when a Customer already exists in the state', () => {
    const state = mockedState();
    let addedState = initialCustomerState;

    beforeEach(() => {
      addedState = CustomerReducer(state, customerActions.loadCustomersSuccess([CustomerMock]));
    });

    it('should update customer on UPDATE_CUSTOMER_SUCCESS', () => {
      const updatedItem = {
        ...CustomerMock,
        name: 'updated name',
        description: 'new description',
      };
      const actual = CustomerReducer(addedState, customerActions.updateCustomerSuccess(updatedItem));
      const expected: CustomerState = {
        ...addedState,
        selectedCustomerId: updatedItem.id,
      };
      expected.entities[CustomerMock.id] = updatedItem;
      expect(actual).toEqual(expected, 'Didn\'t update customer');
    });

    it('should return state on UPDATE_CUSTOMER_FAIL', () => {
      const updatedItem = { ...CustomerMock, name: 'not updated' };
      const actual = CustomerReducer(addedState, customerActions.updateCustomerFail(updatedItem));
      expect(actual).toEqual(addedState);
    });

    it('should remove customer on REMOVE_CUSTOMER_SUCCESS', () => {
      const removedItem = CustomerMock;
      const actual = CustomerReducer(addedState, customerActions.removeCustomerSuccess(removedItem));
      const expected: CustomerState = { ...addedState };
      expected.ids = expected.ids.filter((ids) => ids !== removedItem.id);
      delete expected.entities[removedItem.id];
      expect(actual).toEqual(expected, 'Didn\'t remove customer');
    });

    it('should return state on REMOVE_CUSTOMER_FAIL', () => {
      const removedItem = { ...CustomerMock, name: 'not updated' };
      const actual = CustomerReducer(addedState, customerActions.removeCustomerFail(removedItem));
      expect(actual).toEqual(addedState);
    });

    it('should GET_CUSTOMERs when there already exists an Customer on the state', () => {
      const actual = CustomerReducer(addedState, customerActions.getCustomers());
      const expected = {
        ids: [...state.ids, ...[CustomerMock.id]],
        entities: Object.assign({}, state.entities, { [CustomerMock.id]: CustomerMock }),
        selectedCustomerId: null,
        search: initialCustomerState.search,
      };
      expect(actual).toEqual(expected);
    });

    it('should GET_CUSTOMER will return the selected Customer', () => {
      const actual = CustomerReducer(addedState, customerActions.getCustomer(CustomerMock));
      const expected = {
        ids: [CustomerMock.id],
        entities: { [CustomerMock.id]: CustomerMock },
        selectedCustomerId: CustomerMock.id,
        search: initialCustomerState.search,
      };
      expect(actual).toEqual(expected);
    });

    it('getEntities should return all the entities of an CustomerState', () => {
      const entities = getEntities(addedState);
      expect(entities).toEqual(addedState.entities);
    });

    it('getIds should return all the ids of an CustomerState', () => {
      const ids = getIds(addedState);
      expect(ids).toEqual(addedState.ids);
    });

    it('getSelectedId should return the id of the selected CustomerState', () => {
      const selectedCustomerId = getSelectedId(addedState);
      expect(selectedCustomerId).toEqual(addedState.selectedCustomerId);
    });

    it('getSelected should return the entity of the selected CustomerState', () => {
      const selectedCustomer = getSelected(addedState);
      const selected = addedState.entities[addedState.selectedCustomerId];
      expect(selectedCustomer).toEqual(selected);
    });

    it('getAll should return all the entities of the CustomerState', () => {
      const selectedCustomer = getAll(addedState);
      const selected = addedState.ids.map((id) => addedState.entities[id]);
      expect(selectedCustomer).toEqual(selected);
    });

    it('getCustomerById should return an especific Customer with the id provided', () => {
      const selectedCustomer = getCustomerById(addedState, CustomerMock.id);
      expect(selectedCustomer).toEqual(CustomerMock);
    });

    it('getCustomerByName should return a specific Customer with the provided name', () => {
      const selectedCustomer = getCustomerByName(addedState, CustomerMock.first_name);
      expect(selectedCustomer).toEqual(CustomerMock);
    });

    it('getCustomersByCity should return a list of customers with the provided city', () => {
      const selectedCustomers = getCustomersByCity(addedState, CustomerMock.city);
      expect(selectedCustomers).toEqual([CustomerMock]);
    });

    it('getCustomersByCountry should return a list of customers with the provided country', () => {
      const selectedCustomers = getCustomersByCountry(addedState, CustomerMock.country);
      expect(selectedCustomers).toEqual([CustomerMock]);
    });

    it('getCustomersByEmail should return a list of customers with the provided email', () => {
      const selectedCustomers = getCustomerByEmail(addedState, CustomerMock.email);
      expect(selectedCustomers).toEqual(CustomerMock);
    });

    it('getCustomersByActivity should return a list of customers with the provided actibity', () => {
      const activity = true;
      const selectedCustomers = getCustomersByActivity(addedState, activity);
      const expected = addedState.ids
        .filter((id) => addedState.entities[id].is_active === activity)
        .map((id) => addedState.entities[id]);
      expect(selectedCustomers).toEqual(expected);
    });
  });
});
