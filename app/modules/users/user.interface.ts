export interface IUser {
  firstName: string,
  lastName: string,
  password: string,
  email: string,
}

export interface IUserResponse extends IUser {
  id: string,
}
