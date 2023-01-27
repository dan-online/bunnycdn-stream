import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import type { ReadStream } from 'fs';
import { BunnyCdnStreamError } from './error';
import { BunnyCdnStreamVideo } from './structures/Video';

export class BunnyCdnStream {
  public axiosOptions: BunnyCdnStream.BunnyAxiosRequestConfig = {
    headers: new AxiosHeaders({ Accept: 'application/json', 'Content-Type': 'application/json', AccessKey: '' }),
    url: 'https://video.bunnycdn.com',
    method: 'GET',
    maxBodyLength: Infinity
  };

  /**
   * Options for connecting and authenticating with the Bunny CDN API
   */
  public options: BunnyCdnStream.Options;

  public constructor(options: BunnyCdnStream.Options) {
    this.options = options;
    this.axiosOptions.headers.AccessKey = this.options.apiKey;
  }

  /**
   * Retrieve a video from BunnyCdn
   * @returns A {@link BunnyCdnStream.VideoResponse} instance.
   * @param videoId The video ID
   * @example
   * ```typescript
   * await stream.getVideo("0273f24a-79d1-d0fe-97ca-b0e36bed31es")
   * ```
   */
  public async getVideo(videoId: string): Promise<BunnyCdnStreamVideo> {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/videos/${videoId}`;
    const video = await this.request<BunnyCdnStream.VideoResponse>(options, 'fetch');
    return new BunnyCdnStreamVideo(video);
  }

  /**
   * Update video information
   * @returns A {@link BunnyCdnStream.VideoResponse} instance.
   * @param videoId The video ID
   * @param data The data to update
   * @example
   * ```typescript
   * await stream.updateVideo("0273f24a-79d1-d0fe-97ca-b0e36bed31es", { title: "New title" })
   * ```
   */
  public async updateVideo(
    videoId: string,
    data: {
      title?: string;
      collectionId?: string;
      chapters?: { title: string; start: number; end: number };
      moments?: { label: string; timestamp: number };
    } = {}
  ): Promise<BunnyCdnStream.VideoResponse> {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/videos/${videoId}`;
    options.method = 'POST';
    options.data = JSON.stringify(data);

    const video = await this.request<BunnyCdnStream.VideoResponse>(options, 'update');
    return new BunnyCdnStreamVideo(video);
  }

  /**
   * Delete a video
   * @returns A {@link DeleteVideoResponse} instance.
   * @param videoId The video ID
   * @example
   * ```typescript
   * await stream.deleteVideo("0273f24a-79d1-d0fe-97ca-b0e36bed31es")
   * ```
   */
  public async deleteVideo(videoId: string) {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/videos/${videoId}`;
    options.method = 'DELETE';

    return this.request<BunnyCdnStream.DeleteVideoResponse>(options, 'delete');
  }

  /**
   * Create a video, this does not upload the video file
   * @returns A {@link BunnyCdnStream.VideoResponse} instance.
   * @param data The data to create the video with
   * @example
   * ```typescript
   * await stream.createVideo({ title: "The best title" })
   * ```
   */
  public async createVideo(data: { title: string; collectionId?: string }) {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/videos`;
    options.method = 'POST';
    options.data = JSON.stringify(data);

    const video = await this.request<BunnyCdnStream.VideoResponse>(options, 'create');
    return new BunnyCdnStreamVideo(video);
  }

  /**
   * Upload video, this does not create the video and requires a created video
   * @returns A {@link UploadVideoResponse} instance.
   * @param file The video file to upload as a readable stream
   * @param videoId The video id to upload to of a created video
   * @example
   * ```typescript
   * await stream.uploadVideo(createReadStream("./file.mp4"), "0273f24a-79d1-d0fe-97ca-b0e36bed31es")
   * ```
   */
  public async uploadVideo(file: ReadStream, videoId: string) {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/videos/${videoId}`;
    options.method = 'PUT';
    options.data = file;
    options.headers.set('Content-Type', 'application/octet-stream');

    return this.request<BunnyCdnStream.UploadVideoResponse>(options, 'upload');
  }

  /**
   * Create and upload a video in one function
   * @returns A {@link BunnyCdnStream.VideoResponse} instance.
   * @param file The video file to upload as a readable stream
   * @param data The data to create the video with
   * @example
   * ```typescript
   * await stream.createAndUploadVideo(createReadStream("./file.mp4"), { title: "The best title" })
   * ```
   */
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

  /**
   * Get video statistics
   * @returns A {@link VideoStatisticsResponse} instance.
   * @param data The data to fetch video statistics with
   * @example
   * ```typescript
   * await stream.getVideoStatistics({ videoId: "0273f24a-79d1-d0fe-97ca-b0e36bed31es" })
   * ```
   */
  public async getVideoStatistics(
    data: {
      videoId?: string;
      hourly?: boolean;
      dateTo?: string;
      dateFrom?: string;
    } = {}
  ) {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/statistics`;
    options.data = JSON.stringify({ ...data, videoGuid: data.videoId });

    return this.request<BunnyCdnStream.VideoStatisticsResponse>(options, 'fetch');
  }

  /**
   * Force reencode a video
   *
   * NOTE: This sometimes fails and is not very reliable, use with caution
   * @returns A {@link BunnyCdnStream.VideoResponse} instance.
   * @param videoId The video ID
   * @example
   * ```typescript
   * await stream.reencodeVideo("0273f24a-79d1-d0fe-97ca-b0e36bed31es")
   * ```
   */
  public async reencodeVideo(videoId: string) {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/videos/${videoId}/reencode`;
    options.method = 'POST';

    const video = await this.request<BunnyCdnStream.VideoResponse>(options, 'reencode');

    return new BunnyCdnStreamVideo(video);
  }

  /**
   * List videos
   * @returns An array of {@link VideoStatisticsResponse} instances.
   * @param data The options to list videos with
   * @example
   * ```typescript
   * await stream.listVideos({ page: 2, search: "The best title", itemsPerPage: 10 })
   * ```
   */
  public async listVideos(data: { page?: number; itemsPerPage?: number; search?: string; collection?: string; orderBy?: string } = {}) {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/videos`;
    options.data = JSON.stringify(data);

    const videos = await this.request<BunnyCdnStream.ListVideosResponse>(options, 'list');
    return { ...videos, items: videos.items.map((video) => new BunnyCdnStreamVideo(video)) };
  }

  /**
   * List all videos with an optional callback between each page
   * @returns An array of {@link VideoStatisticsResponse} instances.
   * @param data The options to list videos with
   * @param stop The callback that if returns ``true`` stops the iteration
   * @example
   * ```typescript
   * await stream.listAllVideos()
   * ```
   */
  public async listAllVideos(
    data: { search?: string; collection?: string; orderBy?: string; itemsPerPage?: number } = {},
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

  /**
   * Set the thumbnail
   *
   * NOTE: This does not work as BunnyCDN describe but feel free to try
   * @returns A {@link SetThumbnailVideoResponse} instance.
   * @param videoId The video ID
   * @param url The url of the thumbnail
   * @example
   * ```typescript
   * await stream.setThumbnail("0273f24a-79d1-d0fe-97ca-b0e36bed31es", "thumbnail_1.jpg")
   * ```
   */
  public async setThumbnail(videoId: string, url: string) {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/videos/${videoId}/thumbnail`;
    options.method = 'POST';
    options.data = JSON.stringify({ thumbnailUrl: url });
    return this.request<BunnyCdnStream.SetThumbnailVideoResponse>(options, 'setThumbnail');
  }

  /**
   * Fetch a video
   *
   * NOTE: This does not return a video, more a confirmation that a video will be fetched from the url with specific headers
   * @returns A {@link FetchVideoResponse} instance
   * @param videoId The video ID
   * @param data The data to fetch the video from
   * @example
   * ```typescript
   * await stream.fetchVideo("0273f24a-79d1-d0fe-97ca-b0e36bed31es", { url: "https://example.com/file.mp4" })
   * ```
   */
  public async fetchVideo(videoId: string, data: { url: string; headers?: { [key: string]: string } }) {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/videos/${videoId}/fetch`;
    options.method = 'POST';
    options.data = JSON.stringify(data);
    return this.request<BunnyCdnStream.FetchVideoResponse>(options, 'fetch');
  }

  /**
   * Add captions to a video
   * @returns A {@link AddCaptionsVideoResponse} instance.
   * @param videoId The video ID
   * @param data The data to add captions with
   * @example
   * ```typescript
   * await stream.addCaptions("0273f24a-79d1-d0fe-97ca-b0e36bed31es", { captionsFile: readFile("./subtitles.srt"), label: "English", srclang: "en" })
   * ```
   */
  public async addCaptions(videoId: string, data: { captionsFile: Buffer | string; label: string; srclang: string }) {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/videos/${videoId}/captions/${data.srclang}`;
    options.method = 'POST';

    if (data.captionsFile instanceof Buffer) {
      data.captionsFile = data.captionsFile.toString('base64');
    }

    options.data = JSON.stringify(data);
    return this.request<BunnyCdnStream.AddCaptionsVideoResponse>(options, 'addCaptions');
  }

  /**
   * Delete captions from a video
   * @returns A {@link DeleteCaptionsVideoResponse} instance.
   * @param videoId The video ID
   * @param srclang The specified srclang used when creating
   * @example
   * ```typescript
   * await stream.deleteCaptions("0273f24a-79d1-d0fe-97ca-b0e36bed31es", "en")
   * ```
   */
  public async deleteCaptions(videoId: string, srclang: string) {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/videos/${videoId}/captions/${srclang}`;
    options.method = 'DELETE';
    return this.request<BunnyCdnStream.DeleteCaptionsVideoResponse>(options, 'deleteCaptions');
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
      ...this.axiosOptions,
      headers: new AxiosHeaders(this.axiosOptions.headers)
    };
  }
}

export namespace BunnyCdnStream {
  export interface Options {
    videoLibrary: string;
    apiKey: string;
  }
  export interface VideoResponse {
    videoLibraryId: number;
    guid: string;
    title: string;
    dateUploaded: string;
    views: number;
    isPublic: boolean;
    length: number;
    status: number;
    framerate: number;
    width: number;
    height: number;
    availableResolutions: string;
    thumbnailCount: number;
    encodeProgress: number;
    storageSize: number;
    captions: {
      srclang: string;
      label: string;
    }[];
    hasMP4Fallback: boolean;
    collectionId: '';
    thumbnailFileName: string;
    averageWatchTime: number;
    totalWatchTime: number;
    category: string;
    chapters: {
      title: string;
      start: number;
      end: number;
    }[];
    moments: {
      label: string;
      timestamp: number;
    }[];
  }

  export interface DeleteVideoResponse {
    success: boolean;
    message: string;
    statusCode: number;
  }

  export interface UploadVideoResponse {
    success: boolean;
    message: string;
    statusCode: number;
  }

  export interface AddCaptionsVideoResponse {
    success: boolean;
    message: string;
    statusCode: number;
  }

  export interface DeleteCaptionsVideoResponse {
    success: boolean;
    message: string;
    statusCode: number;
  }

  export interface FetchVideoResponse {
    success: boolean;
    message: string;
    statusCode: number;
  }

  export interface SetThumbnailVideoResponse {
    success: boolean;
    message: string;
    statusCode: number;
  }

  export interface VideoStatisticsResponse {
    viewsChart: { [date: string]: number };
    watchTimeChart: { [date: string]: number };
    countryViewCounts: { [country: string]: number };
    countryWatchTime: { [country: string]: number };
    engagementScore: number;
  }

  export interface ListVideosResponse {
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
    items: VideoResponse[];
  }

  export interface BunnyAxiosRequestConfig extends AxiosRequestConfig {
    headers: AxiosRequestHeaders;
  }
}

export { BunnyCdnStreamVideo };
