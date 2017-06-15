import { Order } from './order.model';

export interface OrderSearch {
  id: string | number;
  from: Date;
  to: Date;
  customer: string;
  project: string;
  font: string;
  foundry: number[];
  status: number[];
  licenses: number[];
}

export interface OrderState {
  ids: number[];
  entities: { [id: number]: Order };
  selectedOrderId: number | null;
  search: OrderSearch;
}

export const initialOrderState: OrderState = {
  ids: [],
  entities: {},
  selectedOrderId: null,
  search: {
    id: '',
    from: null,
    to: null,
    customer: '',
    project: '',
    font: '',
    foundry: [],
    status: [],
    licenses: [],
  },
};
