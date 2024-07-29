import joi from "joi"

export const AuthSchema = {
  REGISTER: {
    body: joi.object({
      name: joi.string().required(),
      email: joi.string().required(),
      password: joi.string().required(),
    }),
  },
  LOGIN: {
    body: joi.object({
      email: joi.string().required(),
      password: joi.string().required(),
    }),
  },
  VALIDATE_JWT: {
    body: joi.object({
      accessToken: joi.string().required()
    }),
  },
  NEW_ACCESS_TOKEN: {
    body: joi.object({
      refreshToken: joi.string().required()
    }),
  }
}