export interface ITrack {
  title: string;
  albumId: string;
  bandsIds: string[];
  duration: number;
  released: number;
  genresIds: string[];
}

export interface ITrackResponse extends ITrack {
  id: string;
}
