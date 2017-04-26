import { Order } from './order.model';

export interface OrderState {
  ids: number[];
  entities: { [id: number]: Order };
  selectedOrderId: number | null;
  search: {
    ids: number[],
    loading: boolean
    query: {
      id: string,
      from: Date,
      to: Date,
      customer: string,
      project: string,
      font: string,
      foundry: string,
    },
  }
}

export const initialOrderState: OrderState = {
  ids: [],
  entities: {},
  selectedOrderId: null,
  search: {
    ids: [],
    loading: false,
    query: {
      id: '',
      from: null,
      to: null,
      customer: '',
      project: '',
      font: '',
      foundry: '',
    },
  }
};
