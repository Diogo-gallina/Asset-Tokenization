import fastify from "fastify";
import { env } from "./env";
import { clientsRoutes } from "./routes/clients";
import { transactionsRoutes } from "./routes/tansactions";
import { tokensRoutes } from "./routes/tokens";


const app = fastify();

app.register(clientsRoutes, {
    prefix: 'clients'
});

app.register(tokensRoutes, {
    prefix: 'tokens'
});

app.register(transactionsRoutes, {
    prefix: 'clients'
});


app.listen({
    port: env.PORT
}).then(() => {
    console.log('HTTP Server Running!');
})