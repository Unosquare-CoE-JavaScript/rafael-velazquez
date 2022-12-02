const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./schema');
const { Query } = require('./resolvers/Query');
const { Category } = require('./resolvers/Category');
const { Product } = require('./resolvers/Product');
const { db } = require('./db');
const { Mutation } = require('./resolvers/Mutation');

const resolvers = {
  Query,
  Mutation,
  Category,
  Product
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    db
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
