export interface Credentials {
  username: string;
  password: string;
}

export interface RegistrationCredentials extends Credentials {
  email: string;
  username: string;
  password: string;
}
