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
import { artistTypeDefs } from './modules/artists/schemas/artist';
import { bandTypeDefs } from './modules/bands/schemas/band';
import { BandService } from './modules/bands/services/band.service';
import { bandResolver } from './modules/bands/resolvers/band.resolver';
import { artistResolver } from './modules/artists/resolvers/artist.resolver';
import { GenreService } from './modules/genres/services/genre.service';
import { ArtistService } from './modules/artists/services/artist.service';

config({ path: resolve(cwd(), '.env') });

const PORT = process.env.PORT || 4200;
const resolvers = {};

const server = new ApolloServer({
  typeDefs: [userTypeDefs, genreTypeDefs, artistTypeDefs, bandTypeDefs],
  resolvers: merge(resolvers, userResolver, genreResolver, artistResolver, bandResolver),
  csrfPrevention: true,
  cache: 'bounded',
  dataSources: () => ({
    userService: new UserService(),
    genreService: new GenreService(),
    artistService: new ArtistService(),
    bandService: new BandService(),
  }),
  context: ({ req }) => ({
    token: req.headers.authorization || '',
  }),
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
