export interface IBand {
  name: string;
  origin: string;
  members: string[];
  website: string;
  genresIds: string[];
}

export interface IBandResponse extends IBand {
  id: string;
}

export interface IMember {
  _id: string;
  artist: string;
  instrument: string;
  years: string[];
}
