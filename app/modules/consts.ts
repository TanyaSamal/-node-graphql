export enum URLS {
  GENRES_URL = 'http://localhost:3001/v1/genres',
  ARTISTS_URL='http://localhost:3002/v1/artists',
  BANDS_URL='http://localhost:3003/v1/bands',
  USERS_URL='http://localhost:3004/v1/users',
  ALBUMS_URL='http://localhost:3005/v1/albums',
  TRACKS_URL='http://localhost:3006/v1/tracks',
  FAVOURITES_URL='http://localhost:3007/v1/favourites',
}

export type Deleted = {
  acknowledged: boolean,
  deletedCount: number
}
