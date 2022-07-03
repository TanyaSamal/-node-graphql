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
    return data;
  }

  async getAllAlbums(): Promise<IAlbum[]> {
    const data = await this.get('/');
    return data.items;
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
