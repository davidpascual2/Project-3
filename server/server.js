const express = require('express');
const { ApolloServer } = require('apollo-server-express'); //import ApolloServer
const { typeDefs, resolvers } = require('./schemas'); //import typeDefs and resolvers
const { authMiddleWare } = require('./utils/auth');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes')

const PORT = process.env.PORT || 3001;

// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: authMiddleWare // JWT auth headers - allow resolver to have headers become "conext" perameter
// });

const app = express();

async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: authMiddleWare // JWT auth headers - allow resolver to have headers become "conext" perameter
    });

    await server.start();
    server.applyMiddleware({ app });
}
 startServer();
 
app.use(express.urlencoded({extended: true }));
app.use(express.json());

//if in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => console.log(`now listening on localhost:${PORT}`));
});