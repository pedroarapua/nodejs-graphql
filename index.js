const {
  ApolloServerPluginLandingPageLocalDefault
} = require('apollo-server-core');
const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

const getProductById = async (filter) => {
  try {
    const { data } = await axios.get(`https://muddy-water-9974.getsandbox.com/v1/products/${filter.gemcoId}`)
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const getPricesByProductId = async (gemcoId) => {
  try {
    const { data } = await axios.get(`https://muddy-water-9974.getsandbox.com/v1/products/${gemcoId}/prices`)
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    product: async (_, filter) => {
      const data = await getProductById(filter)
      return [data]
    }
  },
  Product: {
    prices: async ({ gemcoId }) => {
      return await getPricesByProductId(gemcoId)
    }
  }
};

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Product {
    id: String!
    anotherId: String!
    barcode: String
    title: String!
    description: String
    url: String
    prices: [Price!]
  }

  type Price {
    id: String!
    value: Float!
  }

  type Query {
    product(id: String, anotherId: String, barcode: String): [Product]!
  }
`;

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  /**
   * What's up with this embed: true option?
   * These are our recommended settings for using AS;
   * they aren't the defaults in AS3 for backwards-compatibility reasons but
   * will be the defaults in AS4. For production environments, use
   * ApolloServerPluginLandingPageProductionDefault instead.
  **/
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});