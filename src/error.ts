import { AxiosError } from 'axios';
import { lowerObject } from './utils';

const errorTypes: { [key: number]: string } = {
  404: 'NOT_FOUND',
  400: 'BAD_REQUEST',
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  500: 'INTERNAL_SERVER_ERROR',
  502: 'BAD_GATEWAY',
  503: 'SERVICE_UNAVAILABLE',
  504: 'GATEWAY_TIMEOUT'
};

export class BunnyCdnStreamError extends Error {
  public name: string;
  public code: number;

  public constructor(axiosError: AxiosError | string, when?: string, code?: number) {
    super();
    this.name = 'BunnyCdnStreamError';
    if (axiosError instanceof AxiosError) {
      this.message = `BunnyCdnStreamError: Operation "${when}" - ${axiosError.response ? errorTypes[axiosError.response.status] : 'UNKNOWN_ERROR'} ${
        axiosError.message
      }`;

      this.code = axiosError.response ? axiosError.response.status : 0;
      if (axiosError.response?.data) {
        if (typeof axiosError.response.data === 'object') {
          const data = lowerObject<Record<string, any>>(axiosError.response.data);
          if ('error' in data) {
            this.message += `: ${data.error}`;
          }

          if ('message' in data) {
            this.message += `: ${data.message}`;
          }
        } else {
          this.message += `: ${JSON.stringify(axiosError.response.data)}`;
        }
      }
    } else {
      this.code = code || -1;
      this.message = `BunnyCdnStreamError: Unable to ${when}, ${axiosError}`;
    }
  }
}
