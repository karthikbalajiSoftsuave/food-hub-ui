export type Tlogin = {
  email: string;
  password: string;
};

export interface Tregister extends TregisterPayload {
  confirmPassword?: string
};

export type TregisterPayload = {
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  phone_number: string
}