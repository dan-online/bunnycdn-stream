import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { fileTypeFromBuffer } from 'file-type';
import { ReadStream } from 'fs';
import { createHash } from 'node:crypto';
import { BunnyCdnStreamError } from './error';
import { BunnyCdnStreamVideo } from './structures/Video';

export const lowerObject = <T>(obj: object) => {
  const newObj: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    newObj[key[0].toLowerCase() + key.slice(1)] = value;
  }

  return newObj as T;
};

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
      chapters?: { title: string; start: number; end: number }[];
      moments?: { label: string; timestamp: number }[];
      metaTags?: { property: string; value: string }[];
    } = {}
  ): Promise<BunnyCdnStream.UpdateVideoResponse> {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/videos/${videoId}`;
    options.method = 'POST';
    options.data = JSON.stringify(data);

    return this.request<BunnyCdnStream.UpdateVideoResponse>(options, 'update');
  }

  /**
   * Delete a video
   * @returns A {@link BunnyCdnStream.DeleteVideoResponse} instance.
   * @param videoId The video ID
   * @example
   * ```typescript
   * await stream.deleteVideo("0273f24a-79d1-d0fe-97ca-b0e36bed31es")
   * ```
   */
  public async deleteVideo(videoId: string): Promise<BunnyCdnStream.DeleteVideoResponse> {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/videos/${videoId}`;
    options.method = 'DELETE';

    return this.request<BunnyCdnStream.DeleteVideoResponse>(options, 'delete');
  }

  /**
   * Delete all videos
   *
   * NOTE: This uses the listVideos method and will iterate over all pages and delete all videos per page before continuing to the next page.
   * @returns void
   * @example
   * ```typescript
   * await stream.deleteAllVideos();
   * ```
   */
  public async deleteAllVideos() {
    const iterate = async (page: number) => {
      const { items: videos } = await this.listVideos({ page });
      if (videos.length === 0) return;
      await Promise.all(videos.map((video) => this.deleteVideo(video.guid)));
      await iterate(page + 1);
    };

    await iterate(1);
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
  public async createVideo(data: { title: string; collectionId?: string }): Promise<BunnyCdnStreamVideo> {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/videos`;
    options.method = 'POST';
    options.data = JSON.stringify(data);

    const video = await this.request<BunnyCdnStream.VideoResponse>(options, 'create');
    return new BunnyCdnStreamVideo(video);
  }

  /**
   * Upload video, this does not create the video and requires a created video
   * @returns A {@link BunnyCdnStream.UploadVideoResponse} instance.
   * @param file The video file to upload as a readable stream
   * @param videoId The video id to upload to of a created video
   * @param data Optional paramaters such as enabledResolutions
   * @example
   * ```typescript
   * await stream.uploadVideo(createReadStream("./file.mp4"), "0273f24a-79d1-d0fe-97ca-b0e36bed31es")
   * ```
   */
  public async uploadVideo(file: ReadStream, videoId: string, data?: { enabledResolutions?: string }) {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/videos/${videoId}`;
    options.method = 'PUT';
    options.data = file;
    options.params = data;
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

    await this.uploadVideo(file, createdVideo.guid);

    return createdVideo;
  }

  /**
   * Get video statistics
   * @returns A {@link BunnyCdnStream.VideoHeatmapResponse} instance.
   * @param videoId The video id to get heatmap info from
   * @example
   * ```typescript
   * await stream.getVideoHeatmap("0273f24a-79d1-d0fe-97ca-b0e36bed31es")
   * ```
   */
  public async getVideoHeatmap(videoId: string) {
    const options = this.getOptions();
    options.method = 'GET';
    options.url += `/library/${this.options.videoLibrary}/videos/${videoId}/heatmap`;

    return this.request<BunnyCdnStream.VideoHeatmapResponse>(options, 'getHeatmap');
  }

  /**
   * Get video statistics
   * @returns A {@link BunnyCdnStream.VideoStatisticsResponse} instance.
   * @param data The data to fetch video statistics with
   * @example
   * ```typescript
   * await stream.getVideoStatistics("0273f24a-79d1-d0fe-97ca-b0e36bed31es")
   * ```
   */
  public async getVideoStatistics(
    videoId: string,
    data: {
      hourly?: boolean;
      dateTo?: string;
      dateFrom?: string;
    } = {}
  ) {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/statistics`;
    options.data = JSON.stringify({ ...data, videoGuid: videoId });

    return this.request<BunnyCdnStream.VideoStatisticsResponse>(options, 'fetch');
  }

  /**
   * Force re-encode a video
   *
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
   * @returns An array of {@link BunnyCdnStream.VideoStatisticsResponse} instances.
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
   * @returns An array of {@link BunnyCdnStream.VideoStatisticsResponse} instances.
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
    const all: BunnyCdnStreamVideo[] = [];
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
   * NOTE: The file type is automatically detected from the buffer, however if it fails, it will default to ``image/jpeg``
   * @returns A {@link BunnyCdnStream.SetThumbnailVideoResponse} instance.
   * @param videoId The video ID
   * @param thumbnail A buffer of the thumbnail
   * @param overrideContentType The content type to override and skip the automatic detection
   * @example
   * ```typescript
   * await stream.setThumbnail("0273f24a-79d1-d0fe-97ca-b0e36bed31es", readFileSync("thumbnail.jpg"))
   * ```
   */
  public async setThumbnail(videoId: string, thumbnail: Buffer | ReadStream | string, overrideContentType?: string) {
    const options = this.getOptions();
    const ct = overrideContentType ? { mime: overrideContentType } : undefined;

    // if thumbnail is a buffer, we can auto detect the content type, if the ct is not overridden
    // if thumbnail is a stream, we set the content type to octet-stream
    if (typeof thumbnail !== 'string')
      options.headers['Content-Type'] =
        thumbnail instanceof ReadStream ? 'application/octet-stream' : (ct || (await fileTypeFromBuffer(thumbnail)) || { mime: 'image/jpg' }).mime;

    options.url += `/library/${this.options.videoLibrary}/videos/${videoId}/thumbnail`;
    options.method = 'POST';

    if (typeof thumbnail === 'string') {
      options.data = JSON.stringify({ thumbnailUrl: thumbnail });
    } else {
      options.data = thumbnail;
    }

    return this.request<BunnyCdnStream.SetThumbnailVideoResponse>(options, 'setThumbnail');
  }

  /**
   * Upload a video using a URL
   *
   * NOTE: This will not work if the video is not public, and the thumbnail/preview will not be regenerated for existing videos
   * @returns A {@link BunnyCdnStream.FetchVideoResponse} instance
   * @param videoId The video ID
   * @param data The data with video url to fetch and optional headers
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
   * @returns A {@link BunnyCdnStream.AddCaptionsVideoResponse} instance.
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

    if (typeof data.captionsFile !== 'string') {
      data.captionsFile = data.captionsFile.toString('base64');
    }

    options.data = JSON.stringify(data);
    return this.request<BunnyCdnStream.AddCaptionsVideoResponse>(options, 'addCaptions');
  }

  /**
   * Delete captions from a video
   * @returns A {@link BunnyCdnStream.DeleteCaptionsVideoResponse} instance.
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

  /**
   * Create a collection
   * @returns A {@link BunnyCdnStream.CreateCollectionResponse} instance.
   * @param name The collection name
   * @example
   * ```typescript
   * await stream.createCollection("New Collection")
   * ```
   */
  public async createCollection(name: string): Promise<BunnyCdnStream.CreateCollectionResponse> {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/collections`;
    options.method = 'POST';
    options.data = JSON.stringify({ name });
    return this.request<BunnyCdnStream.CreateCollectionResponse>(options, 'createCollection');
  }

  /**
   * Retrieve info about a collection from BunnyCdn
   * @returns A {@link BunnyCdnStream.BunnyCdnStreamCollection} instance.
   * @param collectionId The collection ID
   * @example
   * ```typescript
   * await stream.getCollection("0273f24a-79d1-d0fe-97ca-b0e36bed31es")
   * ```
   */
  public async getCollection(collectionId: string): Promise<BunnyCdnStream.BunnyCdnStreamCollection> {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/collections/${collectionId}`;
    return this.request<BunnyCdnStream.BunnyCdnStreamCollection>(options, 'getCollection');
  }

  /**
   * List collections
   * @returns a {@link BunnyCdnStream.ListCollectionsResponse} instances.
   * @param data The options to list collections with
   * @example
   * ```typescript
   * await stream.listCollections({ page: 2, search: "Y collections", itemsPerPage: 100, orderBy: 'date' })
   * ```
   */
  public async listCollections(data: { page?: number; itemsPerPage?: number; search?: string; orderBy?: string } = {}) {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/collections`;
    options.params = { ...data };
    const collections = await this.request<BunnyCdnStream.ListCollectionsResponse>(options, 'listCollections');
    return collections;
  }

  /**
   * List all collections with an optional callback between each page
   * @returns An array of {@link BunnyCdnStream.BunnyCdnStreamCollection} instances.
   * @param data The options to list collections with
   * @param stop The callback that if returns ``true`` stops the iteration
   * @example
   * ```typescript
   * await stream.listAllCollections()
   * ```
   */
  public async listAllCollections(
    data: { search?: string; orderBy?: string; itemsPerPage?: number } = {},
    stop?: (collections: BunnyCdnStream.BunnyCdnStreamCollection[], page: number, totalPages: number) => boolean
  ) {
    const all: BunnyCdnStream.BunnyCdnStreamCollection[] = [];
    let nextPage = true;
    let page = 1;
    while (nextPage) {
      const collections = await this.listCollections({ ...data, page, itemsPerPage: data.itemsPerPage || 100 });
      const totalPages = Math.ceil(collections.totalItems / collections.itemsPerPage);

      all.push(...collections.items);

      if (stop && (await stop(collections.items, page, totalPages))) {
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
   * Update info of a collection
   * @returns A {@link BunnyCdnStream.UpdateCollectionResponse} instance.
   * @param collectionId The collection ID
   * @example
   * ```typescript
   * await stream.updateCollection("0273f24a-79d1-d0fe-97ca-b0e36bed31es", { name: 'New Collection'})
   * ```
   */
  public async updateCollection(collectionId: string, data: { name: string }): Promise<BunnyCdnStream.UpdateCollectionResponse> {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/collections/${collectionId}`;
    options.method = 'POST';
    options.data = JSON.stringify(data);
    return this.request<BunnyCdnStream.UpdateCollectionResponse>(options, 'updateCollection');
  }

  /**
   * Delete a collection
   * @returns A {@link BunnyCdnStream.DeleteCollectionResponse} instance.
   * @param collectionId The collection ID
   * @example
   * ```typescript
   * await stream.deleteCollection("0273f24a-79d1-d0fe-97ca-b0e36bed31es")
   * ```
   */
  public async deleteCollection(collectionId: string): Promise<BunnyCdnStream.DeleteCollectionResponse> {
    const options = this.getOptions();
    options.url += `/library/${this.options.videoLibrary}/collections/${collectionId}`;
    options.method = 'DELETE';
    return this.request<BunnyCdnStream.DeleteCollectionResponse>(options, 'deleteCollection');
  }

  /**
   * Delete all collections
   * @returns void
   * @example
   * ```typescript
   * await stream.deleteAllCollections()
   * ```
   */
  public async deleteAllCollections() {
    const iterate = async (page: number) => {
      const { items: collections } = await this.listCollections({ page });
      if (collections.length === 0) return;
      await Promise.all(collections.map((collection) => this.deleteCollection(collection.guid)));
      await iterate(page + 1);
    };

    await iterate(1);
  }

  /**
   * Generate a direct upload tus
   *
   * NOTE: metadata.filetype is required for the tus upload to work
   * @returns A {@link BunnyCdnStream.CreateDirectUpload}
   * @param data The data to create the video with
   * @param expirationTime The expiration time of the tus upload
   * @example
   * ```typescript
   * await stream.createDirectUpload({ title: "My Video" })
   * ```
   */
  public async createDirectUpload(data: { title: string; collection?: string }, expirationTime = 3600): Promise<BunnyCdnStream.CreateDirectUpload> {
    // create a video
    const video = await this.createVideo(data);
    const hash = this.generateTUSHash(video.guid, expirationTime);

    return {
      video,
      endpoint: 'https://video.bunnycdn.com/tusupload',
      headers: {
        AuthorizationSignature: hash,
        AuthorizationExpire: expirationTime,
        VideoId: video.guid,
        LibraryId: this.options.videoLibrary
      },
      metadata: {
        filetype: '',
        title: data.title,
        collection: data.collection
      }
    };
  }

  private generateTUSHash(videoId: string, expirationTime: number) {
    // sha256(library_id + api_key + expiration_time + video_id)
    return createHash('sha256')
      .update(this.options.videoLibrary + this.options.apiKey + expirationTime + videoId)
      .digest('base64');
  }

  private async request<ResponseType extends Record<string, any>>(options: AxiosRequestConfig, name: string): Promise<ResponseType> {
    try {
      const req = await axios.request<ResponseType>(options);

      if (typeof req.data === 'object') {
        req.data = lowerObject(req.data);
      }

      if (
        'message' in req.data &&
        typeof req.data.message === 'string' &&
        'statusCode' in req.data &&
        typeof req.data.statusCode === 'number' &&
        req.data.statusCode !== 200
      ) {
        throw new BunnyCdnStreamError(req.data.message, name, req.data.statusCode);
      }

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
    metaTags: {
      property: string;
      value: string;
    }[];
  }

  export interface DeleteVideoResponse {
    success: boolean;
    message?: string;
    statusCode: number;
  }

  export interface UploadVideoResponse {
    success: boolean;
    message: string;
    statusCode: number;
  }

  export interface UpdateVideoResponse {
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

  export interface VideoHeatmapResponse {
    // TODO: incorrect on bunny's docs, to be discovered
  }

  export interface ListVideosResponse {
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
    items: VideoResponse[];
  }

  export interface CreateCollectionResponse {
    videoLibraryId: number;
    guid: string;
    name: string;
    videoCount: number;
    totalSize: number;
    previewVideoIds: string;
  }

  export interface BunnyCdnStreamCollection {
    videoLibraryId: number;
    guid: string;
    name: string;
    videoCount: number;
    totalSize: number;
    previewVideoIds: string;
  }

  export interface ListCollectionsResponse {
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
    items: BunnyCdnStreamCollection[];
  }

  export interface UpdateCollectionResponse {
    success: boolean;
    message: string;
    statusCode: number;
  }
  export interface DeleteCollectionResponse {
    success: boolean;
    message: string;
    statusCode: number;
  }

  export interface CreateDirectUpload {
    video: BunnyCdnStreamVideo;
    endpoint: string;
    headers: {
      AuthorizationSignature: string;
      AuthorizationExpire: number;
      VideoId: string;
      LibraryId: string;
    };
    metadata: {
      filetype: string;
      title: string;
      collection: string | undefined;
    };
  }

  export interface BunnyAxiosRequestConfig extends AxiosRequestConfig {
    headers: AxiosRequestHeaders;
  }
}

export { BunnyCdnStreamVideo };
