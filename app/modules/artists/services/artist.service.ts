import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { Deleted, URLS } from '../../consts';
import { IArtist, IArtistResponse } from '../artist.interface';

export class ArtistService extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = URLS.ARTISTS_URL;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async getArtistById(id: string): Promise<IArtistResponse> {
    const data = await this.get(`/${encodeURIComponent(id)}`);

    if (data.instruments && Array.isArray(data.instruments)) {
      data.instruments = data.instruments.join(', ');
    }

    return data;
  }

  async getAllArtists(): Promise<IArtist[]> {
    const data = await this.get('/');

    data.items.forEach((artist) => {
      artist.id = artist._id;
      if (artist.instruments && Array.isArray(artist.instruments)) {
        artist.instruments = artist.instruments.join(', ');
      }
    });

    return data.items;
  }

  async createArtist(artist: IArtist): Promise<IArtistResponse> {
    const data = await this.post('', artist);

    if (data.instruments && Array.isArray(data.instruments)) {
      data.instruments = data.instruments.join(', ');
    }

    return data;
  }

  async updateArtist(id: string, artist: IArtist): Promise<IArtistResponse> {
    const data = await this.put(`/${encodeURIComponent(id)}`, artist);

    if (data.instruments && Array.isArray(data.instruments)) {
      data.instruments = data.instruments.join(', ');
    }

    return data;
  }

  async deleteArtist(id: string): Promise<Deleted> {
    await this.delete(`/${encodeURIComponent(id)}`);
    return {
      acknowledged: true,
      deletedCount: 1,
    };
  }
}
