import { merge } from 'lodash';
import { userTypeDefs } from './modules/users/schemas/user';
import { userResolver } from './modules/users/resolvers/user.resolver';
import { UserService } from './modules/users/services/user.service';
import { genreTypeDefs } from './modules/genres/schemas/genre';
import { genreResolver } from './modules/genres/resolvers/genre.resolver';
import { artistTypeDefs } from './modules/artists/schemas/artist';
import { bandTypeDefs } from './modules/bands/schemas/band';
import { trackTypeDefs } from './modules/tracks/schemas/track';
import { albumTypeDefs } from './modules/albums/schemas/album';
import { favouritesTypeDefs } from './modules/favourites/schemas/favourite';
import { BandService } from './modules/bands/services/band.service';
import { bandResolver } from './modules/bands/resolvers/band.resolver';
import { artistResolver } from './modules/artists/resolvers/artist.resolver';
import { trackResolver } from './modules/tracks/resolvers/track.resolver';
import { albumResolver } from './modules/albums/resolvers/album.resolver';
import { favouriteResolver } from './modules/favourites/resolvers/favourite.resolver';
import { GenreService } from './modules/genres/services/genre.service';
import { ArtistService } from './modules/artists/services/artist.service';
import { TrackService } from './modules/tracks/services/track.service';
import { AlbumService } from './modules/albums/services/album.service';
import { FavouritesService } from './modules/favourites/services/favourite.service';

export const typeDefs = [
  userTypeDefs,
  genreTypeDefs,
  artistTypeDefs,
  bandTypeDefs,
  trackTypeDefs,
  albumTypeDefs,
  favouritesTypeDefs,
];

const resolvers = {};
export const mergedResolvers = merge(
  resolvers,
  userResolver,
  genreResolver,
  artistResolver,
  bandResolver,
  trackResolver,
  albumResolver,
  favouriteResolver,
);

export const dataSources = () => ({
  userService: new UserService(),
  genreService: new GenreService(),
  artistService: new ArtistService(),
  bandService: new BandService(),
  trackService: new TrackService(),
  albumService: new AlbumService(),
  favouritesService: new FavouritesService(),
});
