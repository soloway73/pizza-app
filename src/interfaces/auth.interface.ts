export interface LoginResponse {
  access_token: string;
}

export interface UserResponse {
  id: number;
  email: string;
  passwordHash?: string;
  address?: string;
  name: string;
  restoreToken?: null | string;
  phone?: string;
}
