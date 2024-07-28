export interface AuthPayload {
  id: string,
  name: string,
  email: string,
  iat?: number,
  exp?: number
}