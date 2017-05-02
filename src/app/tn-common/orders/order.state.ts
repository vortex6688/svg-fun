import { Order } from './order.model';

export interface OrderSearch {
  id: string | number;
  from: Date;
  to: Date;
  customer: string;
  project: string;
  font: string;
  foundry: string;
  status: number[];
  licenses: number[];
}

export interface OrderState {
  ids: number[];
  entities: { [id: number]: Order };
  selectedOrderId: number | null;
  search: {
    ids: number[],
    active: boolean,
    query: OrderSearch,
  };
}

export const initialOrderState: OrderState = {
  ids: [],
  entities: {},
  selectedOrderId: null,
  search: {
    ids: [],
    active: false,
    query: {
      id: '',
      from: null,
      to: null,
      customer: '',
      project: '',
      font: '',
      foundry: '',
      status: [],
      licenses: [],
    },
  }
};
