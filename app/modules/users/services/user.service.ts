import { RESTDataSource } from 'apollo-datasource-rest';
import { URLS } from '../../consts';
import { IUser, IUserResponse } from '../user.interface';

export class UserService extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = URLS.USERS_URL;
  }

  async getUserById(id: string): Promise<IUserResponse> {
    const data = await this.get(`/${encodeURIComponent(id)}`);
    if (data) {
      data.id = data._id;
    }
    return data;
  }

  async login(email: string, password: string): Promise<{ jwt: string }> {
    const data = await this.post('/login', { email, password });
    this.context.token = data.jwt;
    return data;
  }

  async register(user: IUser): Promise<IUserResponse> {
    const data = await this.post('/register', user);
    if (data) {
      data.id = data._id;
    }
    return data;
  }
}
