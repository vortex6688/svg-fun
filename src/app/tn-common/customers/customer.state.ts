import { Customer } from './customer.model';

export interface CustomerSearch {
  name: string;
  email: string;
  city: string[];
  country: string[];
}

export interface CustomerState {
  ids: number[];
  entities: { [id: number]: Customer };
  selectedCustomerId: number | null;
  search: CustomerSearch;
}

export const initialCustomerState: CustomerState = {
  ids: [],
  entities: {},
  selectedCustomerId: null,
  search: {
    name: '',
    email: '',
    city: [],
    country: [],
  },
};
