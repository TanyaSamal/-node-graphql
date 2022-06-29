import { ApolloServer } from 'apollo-server';
import { config } from 'dotenv';
import { resolve } from 'path';
import { cwd } from 'process';
import { merge } from 'lodash';
import { userTypeDefs } from './modules/users/schemas/user';
import { userResolver } from './modules/users/resolvers/user.resolver';
import { UserService } from './modules/users/services/user.service';

config({ path: resolve(cwd(), '.env') });
const { PORT } = process.env;
const resolvers = {};

const server = new ApolloServer({
  typeDefs: [userTypeDefs],
  resolvers: merge(resolvers, userResolver),
  csrfPrevention: true,
  cache: 'bounded',
  dataSources: () => ({
    usersService: new UserService(),
  }),
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    return { token };
  },
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
