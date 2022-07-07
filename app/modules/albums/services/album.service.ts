import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { Deleted, URLS } from '../../consts';
import { IAlbum, IAlbumResponse } from '../album.interface';

export class AlbumService extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = URLS.ALBUMS_URL;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async getAlbumById(id: string): Promise<IAlbumResponse> {
    const data = await this.get(`/${encodeURIComponent(id)}`);

    if (!data) {
      throw new Error('Album not found');
    }

    return data;
  }

  async getAllAlbums(limit: number = 5, offset: number = 0): Promise<IAlbum[]> {
    const data = await this.get('/', { limit, offset });

    if (!data) {
      throw new Error('Albums not found');
    } else {
      data.items.forEach((album) => album.id = album._id);
      return data.items;
    }
  }

  async createAlbum(album: IAlbum): Promise<IAlbumResponse> {
    const data = await this.post('', album);
    return data;
  }

  async updateAlbum(id: string, album: IAlbum): Promise<IAlbumResponse> {
    const data = await this.put(`/${encodeURIComponent(id)}`, album);
    return data;
  }

  async deleteAlbum(id: string): Promise<Deleted> {
    const data = await this.delete(`/${encodeURIComponent(id)}`);
    return data;
  }
}
