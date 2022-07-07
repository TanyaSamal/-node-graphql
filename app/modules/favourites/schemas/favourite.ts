import { gql } from 'apollo-server';

export const favouritesTypeDefs = gql`
type Favourites {
  id: ID!
  userId: ID
  bands: [Band]
  genres: [Genre]
  artists: [Artist]
  tracks: [Track]
}

extend type Query {
  favourites: Favourites
}

type Mutation {
  addTrackToFavourites(trackId: ID!): Favourites!
  addBandToFavourites(bandId: ID!): Favourites!
  addArtistToFavourites(artistId: ID!): Favourites!
  addGenreToFavourites(genreId: ID!): Favourites!
  removeTrackToFavourites(trackId: ID!): Favourites!
  removeBandToFavourites(bandId: ID!): Favourites!
  removeArtistToFavourites(artistId: ID!): Favourites!
  removeGenreToFavourites(genreId: ID!): Favourites!
}`;
