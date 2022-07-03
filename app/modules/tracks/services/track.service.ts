import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { Deleted, URLS } from '../../consts';
import { ITrack, ITrackResponse } from '../track.interface';

export class TrackService extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = URLS.TRACKS_URL;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', `Bearer ${this.context.token}`);
  }

  async getTrackById(id: string): Promise<ITrackResponse> {
    const data = await this.get(`/${encodeURIComponent(id)}`);
    return data;
  }

  async getAllTracks(): Promise<ITrack[]> {
    const data = await this.get('/');
    return data.items;
  }

  async createTrack(Track: ITrack): Promise<ITrackResponse> {
    const data = await this.post('', Track);
    return data;
  }

  async updateTrack(id: string, Track: ITrack): Promise<ITrackResponse> {
    const data = await this.put(`/${encodeURIComponent(id)}`, Track);
    return data;
  }

  async deleteTrack(id: string): Promise<Deleted> {
    const data = await this.delete(`/${encodeURIComponent(id)}`);
    return data;
  }
}
