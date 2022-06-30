import { ApolloServer } from 'apollo-server';
import { config } from 'dotenv';
import { resolve } from 'path';
import { cwd } from 'process';
import { merge } from 'lodash';
import { userTypeDefs } from './modules/users/schemas/user';
import { userResolver } from './modules/users/resolvers/user.resolver';
import { UserService } from './modules/users/services/user.service';
import { genreTypeDefs } from './modules/genres/schemas/genre';
import { genreResolver } from './modules/genres/resolvers/genre.resolver';
import { GenreService } from './modules/genres/services/genre.service';

config({ path: resolve(cwd(), '.env') });

const PORT = process.env.PORT || 4200;
const resolvers = {};

const server = new ApolloServer({
  typeDefs: [userTypeDefs, genreTypeDefs],
  resolvers: merge(resolvers, userResolver, genreResolver),
  csrfPrevention: true,
  cache: 'bounded',
  dataSources: () => ({
    usersService: new UserService(),
    genreService: new GenreService(),
  }),
  context: ({ req }) => ({
    token: req.headers.authorization || '',
  }),
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
