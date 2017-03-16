import { User } from '../user/user.model';

export class Authorization extends User {
  public token: string;
}

export const ANONYMOUS_AUTHORIZATION = {
  id: 0,
  email: 'anonymous@user.com',
  username: 'anonymous@user.com',
  token: null,
  is_active: false,
  is_verified: false,
  is_staff: false,
  is_admin: false,
  can_invoice: false,
  tax_exempt: false,
  created_at: Date.now(),
  updated_at: Date.now(),
};
