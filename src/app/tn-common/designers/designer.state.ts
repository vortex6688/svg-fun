import { Designer } from './designer.model';

export interface DesignerState {
  ids: number[];
  entities: { [id: number]: Designer };
  selectedDesignerId: number | null;
}

export const initialDesignerState: DesignerState = {
  ids: [],
  entities: {},
  selectedDesignerId: null,
};
