import { Foundry } from './foundry.model';

export interface FoundryState {
  ids: number[];
  entities: { [id: number]: Foundry };
  selectedFoundryId: number | null;
}

export const initialFoundryState: FoundryState = {
  ids: [],
  entities: {},
  selectedFoundryId: null,
};
