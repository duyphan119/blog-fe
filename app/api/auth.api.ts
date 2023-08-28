import { AxiosResponse } from "axios";
import { privateApi, publicApi, ResponseEntity } from ".";
import { User } from "./user.api";

const name = "auth";

export type LoginDTO = {
  email: string;
  password: string;
};

export type RegisterDTO = {
  fullName: string;
  phone: string;
} & LoginDTO;

export type AuthenResponse = {
  user: User;
  access_token: string;
};

export type UpdateProfileDTO = {
  fullName: string;
};

const authApi = {
  login: (
    dto: LoginDTO
  ): Promise<AxiosResponse<ResponseEntity<AuthenResponse>>> =>
    publicApi.post(`${name}/login`, dto),
  register: (
    dto: RegisterDTO
  ): Promise<AxiosResponse<ResponseEntity<AuthenResponse>>> =>
    publicApi.post(`${name}/register`, dto),
  getProfile: (): Promise<AxiosResponse<ResponseEntity<User>>> =>
    privateApi().get(`${name}/profile`),
  updateProfile: (
    dto: UpdateProfileDTO
  ): Promise<AxiosResponse<ResponseEntity<User>>> =>
    privateApi().patch(`${name}/profile`, dto),
};

export default authApi;
