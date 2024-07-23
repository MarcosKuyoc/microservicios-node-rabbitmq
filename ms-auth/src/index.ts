import { DatabaseBootstrap } from "./bootstrap/database.bootstrap";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";
import app from "./app";

(async() => {
    try {
        const services = [];
        const serverBootstrap = new ServerBootstrap(app);
        const databaseBootstrap = new DatabaseBootstrap();

        services.push(serverBootstrap.initilize());
        services.push(databaseBootstrap.initilize());
        await Promise.all(services);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();