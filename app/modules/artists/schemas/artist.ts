import { gql } from 'apollo-server';

export const artistTypeDefs = gql`
type Artist {
  id: ID!
  firstName: String
  secondName: String
  middleName: String
  birthDate: String
  birthPlace: String
  country: String
  bands: [Band]
  instruments: String
}

type Query {
  artists: [Artist]
  artist(id: ID!): Artist
}

input InputArtist {
  firstName: String
  secondName: String
  middleName: String
  birthDate: String
  birthPlace: String
  bandsIds: [String]
  country: String
  instruments: [String]
}

type Deleted {
  acknowledged: Boolean
  deletedCount: Int
}

type Mutation {
  createArtist(artist: InputArtist!): Artist
  deleteArtist(id: ID!): Deleted
  updateArtist(id: ID!, artist: InputArtist!): Artist
}`;
