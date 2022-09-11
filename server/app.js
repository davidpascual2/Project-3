const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');

const env = require("dotenv");
const cors = require("cors");

//ENVIRONMENT VARIABLE/CONSTANTS
env.config();

//MONGODB CONNECTION
require("./db/conn");


const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

app.listen(8000, () => {
  console.log(`Server is running on port ${8000}`);
});