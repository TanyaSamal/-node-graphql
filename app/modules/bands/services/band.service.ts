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
    return data;
  }

  async getAllBands(limit: number = 5, offset: number = 0): Promise<IBand[]> {
    const data = await this.get('/', { limit, offset });
    data.items.forEach((band) => band.id = band._id);
    return data.items;
  }

  async createBand(band: IBand): Promise<IBandResponse> {
    const data = await this.post('', band);
    return data;
  }

  async updateBand(id, band: IBand): Promise<IBandResponse> {
    const data = await this.put(`/${encodeURIComponent(id)}`, band);
    return data;
  }

  async deleteBand(id: string): Promise<Deleted> {
    const data = await this.delete(`/${encodeURIComponent(id)}`);
    return data;
  }
}
