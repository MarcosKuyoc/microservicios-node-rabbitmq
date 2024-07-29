import { DatabaseBootstrap } from "./bootstrap/database.bootstrap";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";
import app from "./app";
import { BrokerBootstrap } from './bootstrap/broker.bootstrap';

(async() => {
    try {
        const services = [];
        const serverBootstrap = new ServerBootstrap(app);
        const databaseBootstrap = new DatabaseBootstrap();
        const brokerBootstrap = new BrokerBootstrap();

        services.push(serverBootstrap.initialize());
        services.push(databaseBootstrap.initialize());
        services.push(brokerBootstrap.initialize());
        await Promise.all(services);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();