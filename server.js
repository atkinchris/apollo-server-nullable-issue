const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Book {
    title: String
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    nullable(throwError: Boolean): Book
    nonNullable(throwError: Boolean): Book!
  }
`;

const mutation = (_, { throwError }) => {
  if (throwError) throw Error("Error!!!");
  return { title: "A book" };
};

const resolvers = {
  Query: {
    books: [],
  },
  Mutation: {
    nullable: mutation,
    nonNullable: mutation,
  },
};

module.exports = new ApolloServer({ typeDefs, resolvers });
