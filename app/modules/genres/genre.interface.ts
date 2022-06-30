export interface IGenre {
  name: string
  description: string
  country: string
  year: number,
}

export interface IGenreResponse extends IGenre {
  id: string,
}

export type Deleted = {
  acknowledged: boolean,
  deletedCount: number
}
