import joi from 'joi';
import {Request, Response, NextFunction} from 'express';
import { IError } from './error.interface';

interface SchemaJoi {
  [s: string]: joi.ObjectSchema<any>
}

export class ValidatorMiddleware {
  static validate(shemaJson: SchemaJoi) {
    return (req: Request, res: Response, next: NextFunction) => {
      const parametersOrigin = ["body", "headers", "params", "query"];
      const validateList: Array<joi.ValidationResult> = [];

      parametersOrigin.forEach((origin: string) => {
        if (shemaJson.hasOwnProperty(origin)) {
          switch(origin) {
            case "body":
              validateList.push(shemaJson[origin].validate(req.body, {abortEarly: false}));
            break;
            case "headers":
              validateList.push(shemaJson[origin].validate(req.headers, {abortEarly: false}));
            break;
            case "params":
              validateList.push(shemaJson[origin].validate(req.params, { abortEarly: false}));
            break;
            case "query":
              validateList.push(shemaJson[origin].validate(req.query, {abortEarly: false}));
            break;
          }
        }
      });

      Promise.all(validateList).then((validParameters) => {
        for(const item of validParameters) {
          if (item.error) {
            const error: IError = new Error("Error in parameters");
            error.status = 411;
            error.message = "Parameters error."
            error.stack = item.error.toString();

            console.error(error);
            next(error);
          }
        }
        next();
      })
    }
  }
}