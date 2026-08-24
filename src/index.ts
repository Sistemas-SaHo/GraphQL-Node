import 'dotenv/config';
import { authJwt } from './middlewares';
import { ApolloServer } from 'apollo-server';
import { resolvers, typeDefs } from './graphql';

const startServer = async () => {
    try {
        const port = Number(process.env.PORT_API_GRAPH) || 3000;
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            introspection: true,
            cors: {
                methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
                allowedHeaders: ['Content-Type', 'Authorization', 'x-access-id-user'],
                origin: process.env.ALLOWED_ORIGINS?.split(',') || `http://localhost:${port}`
            },
            context: ({ req }) => authJwt(req),
            formatError: (err) => {
                const { extensions, message, stack } = err;
                console.error('Error GraphQL:', err);
                return { message, code: extensions?.code, details: extensions?.exception, ...(process.env.ENVIRONMENT === 'develop' && { stack }) };
            },
        });

        server.listen({ port }).then(({ url }) => console.log(`Servidor GraphQL listo en: ${url}`));
    } catch (error) {
        console.error('Error al iniciar Apollo Server:', error);
        process.exit(1);
    }
};

startServer();