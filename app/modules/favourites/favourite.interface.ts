export interface IFavourites {
  userId: string;
  bandsIds: string[];
  genresIds: string[];
  artistsIds: string[];
  tracksIds: string[];
}

export interface IFavouritesResponse extends IFavourites {
  id: string;
}

export enum FavouritesField {
  bands = 'bands',
  genres = 'genres',
  artists = 'artists',
  tracks = 'tracks'
}
