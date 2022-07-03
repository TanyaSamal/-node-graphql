import { ApolloServer } from 'apollo-server';
import { config } from 'dotenv';
import { resolve } from 'path';
import { cwd } from 'process';
import { typeDefs, mergedResolvers, dataSources } from './app.module';

config({ path: resolve(cwd(), '.env') });

const PORT = process.env.PORT || 4200;

const server = new ApolloServer({
  typeDefs,
  resolvers: mergedResolvers,
  csrfPrevention: true,
  cache: 'bounded',
  dataSources,
  context: ({ req }) => ({
    token: req.headers.authorization || '',
  }),
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
