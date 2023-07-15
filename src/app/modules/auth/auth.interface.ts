export interface ILoginUserResponse {
  accessToken: string;
  refreshToken?: string;
}

export interface ILoginUser {
  phoneNumber: string;
  password: string;
};

export interface IRefreshTokenResponse {
  accessToken: string;
};