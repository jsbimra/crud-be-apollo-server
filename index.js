const { ApolloServer } = require("apollo-server");
const responseCachePlugin = require('apollo-server-plugin-response-cache');

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const EmpCrudDataSource = require("./datasources/employee-ds");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    empCrudAPI: new EmpCrudDataSource()
  }),
  cacheControl: {
    defaultMaxAge: 0,
    calculateHttpHeaders: false,
  },
  plugins: [responseCachePlugin({
    // sessionId: (requestContext) => (requestContext.request.http.headers.get('sessionid') || null),
    shouldReadFromCache:  (requestContext) => {
      // console.log(requestContext)
      return false;
    }
  })],
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
