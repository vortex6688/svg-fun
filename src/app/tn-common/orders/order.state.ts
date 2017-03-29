import { Order } from './order.model';

export interface OrderState {
  ids: number[];
  entities: { [id: number]: Order };
  selectedOrderId: number | null;
}

export const initialOrderState: OrderState = {
  ids: [],
  entities: {},
  selectedOrderId: null,
};
