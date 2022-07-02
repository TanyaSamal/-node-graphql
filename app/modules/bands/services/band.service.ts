import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { Deleted, URLS } from '../../consts';
import { IBand, IBandResponse } from '../band.interface';

export class BandService extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = URLS.BANDS_URL;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async getBandById(id: string): Promise<IBandResponse> {
    const data = await this.get(`/${encodeURIComponent(id)}`);
    if (data) {
      data.id = data._id;
    }
    return data;
  }

  async getAllBands(): Promise<IBand[]> {
    const data = await this.get('/');
    data.items.forEach((band) => {
      band.id = band._id;
    });
    return data.items;
  }

  async createBand(band: IBand): Promise<IBandResponse> {
    const data = await this.post('', band);
    if (data) {
      data.id = data._id;
    }
    return data;
  }

  async updateBand(id, band: IBand): Promise<IBandResponse> {
    const data = await this.put(`/${encodeURIComponent(id)}`, band);
    if (data) {
      data.id = data._id;
    }
    return data;
  }

  async deleteBand(id: string): Promise<Deleted> {
    await this.delete(`/${encodeURIComponent(id)}`);
    return {
      acknowledged: true,
      deletedCount: 1,
    };
  }
}
