import yenv from 'yenv';
const env = yenv();

export class EnvironmentVariables {
    static get PORT(): number {
        return process.env.PORT || env.PORT || 3000;
    }

    static get PATH_ORDER(): string {
        return process.env.PATH_ORDER || env.PATHS.ORDER;
    }
    
    static get PATH_AUTH(): string {
        return process.env.PATH_AUTH || env.PATHS.AUTH;
    }
}