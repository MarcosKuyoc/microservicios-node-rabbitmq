import fs from 'fs';
import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import { EnvironmentVariables } from './config/app.config';

export const setupSwagger = (app: express.Application) => {
    const swaggerFilePath = path.join(__dirname, 'swagger/swagger.json');

    // Serve the Swagger JSON file with modifications
    app.get('/api-docs.json', (req: Request, res: Response, next: NextFunction) => {
        fs.readFile(swaggerFilePath, 'utf8', (err, data) => {
            if (err) {
                return next(err);
            }
            let swaggerData = JSON.parse(data);

            // Adjust the base URL here
            swaggerData.servers = [{ url: EnvironmentVariables.BASE_API_URL }];

            res.json(swaggerData);
        });
    });
};
