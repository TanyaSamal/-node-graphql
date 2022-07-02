import { gql } from 'apollo-server';

export const bandTypeDefs = gql`
type Band {
  id: ID!
  name: String
  origin: String
  members: [Member]
  website: String
  genres: [Genre]
}

type Member {
  id: ID!
  artist: String
  instrument: String
  years: [String]
}

input MemberInput {
  _id: ID
  artist: String
  instrument: String
  years: [String]
}

input InputBand {
  name: String!
  origin: String
  members: [MemberInput]
  website: String
  genresIds: [String]
}

type Query {
  bands(limit: Int, offset: Int): [Band]
  band(id: ID!): Band
}

type Mutation {
  createBand(band: InputBand!): Band!
  updateBand(id: ID!, band: InputBand!): Band!
  deleteBand(id: ID!): Deleted
}`;
