import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { Deleted, URLS } from '../../consts';
import { IGenre, IGenreResponse } from '../genre.interface';

export class GenreService extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = URLS.GENRES_URL;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async getGenreById(id: string): Promise<IGenreResponse> {
    const data = await this.get(`/${encodeURIComponent(id)}`);
    return data;
  }

  async getAllGenres(): Promise<IGenre[]> {
    const data = await this.get('/');
    data.items.forEach((genre) => genre.id = genre._id);
    return data.items;
  }

  async createGenre(genre: IGenre): Promise<IGenreResponse> {
    const data = await this.post('', genre);
    return data;
  }

  async deleteGenre(id: string): Promise<Deleted> {
    await this.delete(`/${encodeURIComponent(id)}`);
    return {
      acknowledged: true,
      deletedCount: 1,
    };
  }

  async updateGenre(id: string, genre: IGenre): Promise<IGenreResponse> {
    const data = await this.put(`/${encodeURIComponent(id)}`, genre);
    return data;
  }
}