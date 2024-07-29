export interface AuthPayload {
  id: string,
  name: string,
  email: string,
  iat?: number,
  exp?: number
}

export interface ErrorAuthPayload {
  status: number;
  message: string;
}