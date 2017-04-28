import { License } from './license.model';

export interface LicenseState {
  ids: number[];
  entities: { [id: number]: License };
  selectedLicenseId: number | null;
  search: {
    ids: number[],
    loading: boolean
    query: {
      id: string,
      order: number,
      price: string,
      price_paid: string,
      qty: number,
      style: number,
      active: boolean,
      license_type: string,
      years: number,
      start: Date,
      end: Date,
    },
  };
}

export const initialLicenseState: LicenseState = {
  ids: [],
  entities: {},
  selectedLicenseId: null,
  search: {
    ids: [],
    loading: false,
    query: {
      id: '',
      order: 0,
      price: '',
      price_paid: '',
      qty: 0,
      style: 0,
      active: false,
      license_type: '',
      years: 0,
      start: null,
      end: null,
    },
  }
};
