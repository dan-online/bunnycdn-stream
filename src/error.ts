import { AxiosError } from 'axios';

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

  public constructor(axiosError: AxiosError | string, when?: string) {
    super();
    this.name = 'BunnyCdnStreamError';
    if (axiosError instanceof AxiosError) {
      this.message = `BunnyCdnStreamError: Unable to ${when || 'run operation'}, responded with ${
        axiosError.response ? errorTypes[axiosError.response.status] : 'UNKNOWN_ERROR'
      } ${axiosError.message}`;

      this.code = axiosError.response ? axiosError.response.status : 0;
      if (axiosError.response?.data) {
        this.message += `: ${axiosError.response.data}`;
      }
    } else {
      this.code = 0;
      this.message = `BunnyCdnStreamError: Unable to ${when}, ${axiosError}`;
    }
  }
}
