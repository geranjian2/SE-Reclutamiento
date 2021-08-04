import { IUser } from '../../interfaces/user.interface';


export interface TokenInfo {
  token: string;
  expiresIn: number;
}

export interface TokenData {
  userId: string;
  name: string;
  email: string;
}

export interface LoginResult {
  tokenInfo: TokenInfo;
  user: IUser;
}