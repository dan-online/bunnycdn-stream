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

    if (axiosError instanceof AxiosError) {
      console.log(axiosError.response);
      this.name = axiosError.response ? errorTypes[axiosError.response.status] : 'UNKNOWN_ERROR';
      this.code = axiosError.response ? axiosError.response.status : 0;
      this.message = `BunnyCdnStreamError: unable to ${when}`;
      if (axiosError.response?.data) {
        this.message += `: ${axiosError.response?.data}`;
      }
    } else {
      this.name = 'UNKNOWN_ERROR';
      this.code = 0;
      this.message = `BunnyCdnStreamError: unable to ${when} due to ${axiosError}`;
    }
  }
}
