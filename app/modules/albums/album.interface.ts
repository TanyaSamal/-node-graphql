export interface IAlbum {
  name: string;
  released: number;
  artistsIds: string[];
  bandsIds: string[];
  trackIds: string[];
  genresIds: string[];
  image: string;
}

export interface IAlbumResponse extends IAlbum {
  id: string;
}
