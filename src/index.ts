import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import type { ReadStream } from 'fs';
import { BunnyCdnStreamError } from './error';
import { BunnyCdnStreamVideo } from './structures/Video';
import type { BunnyAxiosRequestConfig } from './types/axios';
import type {
  AddCaptionsVideoResponse,
  DeleteCaptionsVideoResponse,
  DeleteVideoResponse,
  FetchVideoResponse,
  ListVideosResponse,
  SetThumbnailVideoResponse,
  UploadVideoResponse,
  VideoResponse,
  VideoStatisticsResponse
} from './types/response';

export class BunnyCdnStream {
  public axiosOptions: BunnyAxiosRequestConfig = {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', AccessKey: '' },
    url: 'https://video.bunnycdn.com',
    method: 'GET',
    maxBodyLength: Infinity
  };

  public options: BunnyCdnStream.Options;

  public constructor(options: BunnyCdnStream.Options) {
    this.options = options;
    this.axiosOptions.headers.AccessKey = this.options.apiKey;
  }

  public async getVideo(videoId: string): Promise<BunnyCdnStreamVideo> {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/videos/${videoId}`;
    const video = await this.request<VideoResponse>(options, 'fetch');
    return new BunnyCdnStreamVideo(video);
  }

  public async updateVideo(
    videoId: string,
    data: {
      title?: string;
      collectionId?: string;
      chapters?: { title: string; start: number; end: number };
      moments: { label: string; timestamp: number };
    }
  ): Promise<VideoResponse> {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/videos/${videoId}`;
    options.method = 'POST';
    options.data = JSON.stringify(data);

    const video = await this.request<VideoResponse>(options, 'update');
    return new BunnyCdnStreamVideo(video);
  }

  public async deleteVideo(videoId: string) {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/videos/${videoId}`;
    options.method = 'DELETE';

    return this.request<DeleteVideoResponse>(options, 'delete');
  }

  public async createVideo(data: { title: string; collectionId?: string }) {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/videos`;
    options.method = 'POST';
    options.data = JSON.stringify(data);

    const video = await this.request<VideoResponse>(options, 'create');
    return new BunnyCdnStreamVideo(video);
  }

  public async uploadVideo(file: ReadStream, videoId: string) {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/videos/${videoId}`;
    options.method = 'PUT';
    options.data = file;
    options.headers['Content-Type'] = 'application/octet-stream';

    return this.request<UploadVideoResponse>(options, 'upload');
  }

  public async createAndUploadVideo(file: ReadStream, data: { title: string; collectionId?: string }) {
    const createdVideo = await this.createVideo(data);
    try {
      await this.uploadVideo(file, createdVideo.guid);
    } catch (err) {
      await this.deleteVideo(createdVideo.guid);
      throw err;
    }

    return createdVideo;
  }

  public async getVideoStatistics(data: {
    videoId?: string;
    hourly?: boolean;
    dateTo?: string;
    dateFrom?: string;
  }): Promise<VideoStatisticsResponse> {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/statistics`;
    options.data = JSON.stringify({ ...data, videoGuid: data.videoId });

    const stats = await this.request<VideoStatisticsResponse>(options, 'fetch');
    return stats;
  }

  public async reencodeVideo(videoId: string) {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/videos/${videoId}/reencode`;
    options.method = 'POST';

    const video = await this.request<VideoResponse>(options, 'reencode');

    return new BunnyCdnStreamVideo(video);
  }

  public async listVideos(data: { page?: number; itemsPerPage?: number; search?: string; collection?: string; orderBy?: string }) {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/videos`;
    options.data = JSON.stringify(data);

    const videos = await this.request<ListVideosResponse>(options, 'list');
    return { ...videos, items: videos.items.map((video) => new BunnyCdnStreamVideo(video)) };
  }

  public async listAllVideos(
    data: { search?: string; collection?: string; orderBy?: string; itemsPerPage?: number },
    stop?: (videos: BunnyCdnStreamVideo[], page: number, totalPages: number) => boolean
  ) {
    const all = [];
    let nextPage = true;
    let page = 1;
    while (nextPage) {
      const videos = await this.listVideos({ ...data, page, itemsPerPage: data.itemsPerPage || 100 });
      const totalPages = Math.ceil(videos.totalItems / videos.itemsPerPage);

      all.push(...videos.items);

      if (stop && (await stop(videos.items, page, totalPages))) {
        nextPage = false;
        continue;
      }

      if (page < totalPages) {
        page++;
      } else {
        nextPage = false;
      }
    }

    return all;
  }

  public async setThumbnail(videoId: string, url: string) {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/videos/${videoId}/thumbnail`;
    options.method = 'POST';
    options.data = JSON.stringify({ thumbnailUrl: url });
    return this.request<SetThumbnailVideoResponse>(options, 'setThumbnail');
  }

  public async fetchVideo(videoId: string, data: { url: string; headers?: { [key: string]: string } }) {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/videos/${videoId}/fetch`;
    options.method = 'POST';
    options.data = JSON.stringify(data);
    return this.request<FetchVideoResponse>(options, 'fetch');
  }

  public async addCaptions(videoId: string, data: { captionsFile: Buffer | string; label: string; srclang: string }) {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/videos/${videoId}/captions/${data.srclang}`;
    options.method = 'POST';

    if (data.captionsFile instanceof Buffer) {
      data.captionsFile = data.captionsFile.toString('base64');
    }

    options.data = JSON.stringify(data);
    return this.request<AddCaptionsVideoResponse>(options, 'addCaptions');
  }

  public async deleteCaptions(videoId: string, srclang: string) {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/videos/${videoId}/captions/${srclang}`;
    options.method = 'DELETE';
    return this.request<DeleteCaptionsVideoResponse>(options, 'deleteCaptions');
  }

  private async request<ResponseType>(options: AxiosRequestConfig, name: string): Promise<ResponseType> {
    try {
      const req = await axios.request(options);
      return req.data;
    } catch (error) {
      throw new BunnyCdnStreamError(error as AxiosError, name);
    }
  }

  private getOptions() {
    return {
      ...this.axiosOptions
    };
  }
}

export namespace BunnyCdnStream {
  export interface Options {
    videoLibrary: string;
    apiKey: string;
  }
}
