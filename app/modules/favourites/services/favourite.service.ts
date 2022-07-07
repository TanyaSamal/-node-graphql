import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { URLS } from '../../consts';
import { FavouritesField, IFavouritesResponse } from '../favourite.interface';

export class FavouritesService extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = URLS.FAVOURITES_URL;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async getAllFavourites(): Promise<IFavouritesResponse> {
    const data = await this.get('/');

    if (!data) {
      throw new Error('Favourites not found');
    }

    return data;
  }

  async addToFavourites(type: FavouritesField, id: string): Promise<IFavouritesResponse> {
    const data = await this.put('/add', { id, type });
    return data;
  }

  async removeFromFavourites(type: FavouritesField, id: string): Promise<IFavouritesResponse> {
    const data = await this.put('/remove', { id, type });
    return data;
  }
}
