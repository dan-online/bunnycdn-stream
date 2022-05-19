import type { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

export interface BunnyAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}
