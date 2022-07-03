import { gql } from 'apollo-server';

export const albumTypeDefs = gql`
type Album {
  id: ID!
  name: String!
  released: Int
  artists: [Artist]
  bands: [Band]
  tracks: [Track]
  genres: [Genre]
  image: String
}

extend type Query {
  albums: [Album]
  album(id: ID!): Album
}

input InputAlbum {
  name: String!
  released: Int
  artistsIds: [String]
  bandsIds: [String]
  trackIds: [String]
  genresIds: [String]
  image: String
}

type Mutation {
  createAlbum(album: InputAlbum!): Album!
  updateAlbum(id: ID!, album: InputAlbum): Album!
  deleteAlbum(id: ID!): Deleted
}`;
