import { createHash } from "node:crypto";
import type { ReadStream } from "node:fs";
import ky, {
	type HTTPError,
	type KyInstance,
	type Options as KyOptions,
} from "ky";
import { BunnyCdnStreamError } from "./error";
import { BunnyCdnStreamVideo } from "./structures/Video";
import { lowerObject } from "./utils";

export class BunnyCdnStream {
	/**
	 * Options for connecting and authenticating with the Bunny CDN API
	 */
	public options: BunnyCdnStream.Options;

	/**
	 * Ky instance for making HTTP requests
	 */
	private ky: KyInstance;

	public constructor(options: BunnyCdnStream.Options) {
		this.options = options;
		this.ky = ky.create({
			prefixUrl: "https://video.bunnycdn.com",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				AccessKey: this.options.apiKey,
			},
			timeout: 10000,
		});
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
		const video = await this.request<BunnyCdnStream.VideoResponse>(
			"fetch",
			`library/${this.options.videoLibrary}/videos/${videoId}`,
		);

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
		} = {},
	): Promise<BunnyCdnStream.UpdateVideoResponse> {
		return this.request<BunnyCdnStream.UpdateVideoResponse>(
			"update",
			`library/${this.options.videoLibrary}/videos/${videoId}`,
			{
				method: "POST",
				json: data,
			},
		);
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
	public async deleteVideo(
		videoId: string,
	): Promise<BunnyCdnStream.DeleteVideoResponse> {
		return this.request<BunnyCdnStream.DeleteVideoResponse>(
			"delete",
			`library/${this.options.videoLibrary}/videos/${videoId}`,
			{ method: "DELETE" },
		);
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
	public async createVideo(data: {
		title: string;
		collectionId?: string;
	}): Promise<BunnyCdnStreamVideo> {
		const video = await this.request<BunnyCdnStream.VideoResponse>(
			"createVideo",
			`library/${this.options.videoLibrary}/videos`,
			{
				method: "POST",
				json: data,
			},
		);

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
	public async uploadVideo(
		file: ReadStream,
		videoId: string,
		data?: { enabledResolutions?: string },
	) {
		// const options = this.getOptions();
		// options.url += `library/${this.options.videoLibrary}/videos/${videoId}`;
		// options.method = "PUT";
		// options.data = file;
		// options.params = data;
		// options.headers.set("Content-Type", "application/octet-stream");

		// return this.request<BunnyCdnStream.UploadVideoResponse>(options, "upload");
		return this.request<BunnyCdnStream.UploadVideoResponse>(
			"uploadVideo",
			`library/${this.options.videoLibrary}/videos/${videoId}`,
			{
				method: "PUT",
				body: file,
				searchParams: data,
				headers: {
					"Content-Type": "application/octet-stream",
				},
			},
		);
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
	public async createAndUploadVideo(
		file: ReadStream,
		data: { title: string; collectionId?: string },
	) {
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
		return this.request<BunnyCdnStream.VideoHeatmapResponse>(
			"getVideoHeatmap",
			`library/${this.options.videoLibrary}/videos/${videoId}/heatmap`,
			{ method: "GET" },
		);
	}

	/**
	 * Get video play data
	 * @returns A {@link BunnyCdnStream.VideoPlayDataResponse} instance.
	 * @param videoId The video id to get play data from
	 * @param data The data to fetch video play data with
	 * @example
	 * ```typescript
	 * await stream.getVideoPlayData("0273f24a-79d1-d0fe-97ca-b0e36bed31es")
	 * ```
	 */
	public async getVideoPlayData(
		videoId: string,
		data: {
			token?: string;
			expires?: number;
		} = {
			token: undefined,
			expires: 0,
		},
	) {
		return this.request<BunnyCdnStream.VideoPlayDataResponse>(
			"getVideoPlayData",
			`library/${this.options.videoLibrary}/videos/${videoId}/play`,
			{
				method: "GET",
				searchParams: data,
			},
		);
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
		} = {},
	) {
		return this.request<BunnyCdnStream.VideoStatisticsResponse>(
			"getVideoStatistics",
			`library/${this.options.videoLibrary}/statistics`,
			{
				method: "GET",
				searchParams: { ...data, videoGuid: videoId },
			},
		);
	}

	/**
	 * Force re-encode a video
	 *
	 * NOTE: This will not work if keepOriginal is set to false
	 * @returns A {@link BunnyCdnStream.VideoResponse} instance.
	 * @param videoId The video ID
	 * @example
	 * ```typescript
	 * await stream.reencodeVideo("0273f24a-79d1-d0fe-97ca-b0e36bed31es")
	 * ```
	 */
	public async reencodeVideo(videoId: string) {
		const video = await this.request<BunnyCdnStream.VideoResponse>(
			"reencodeVideo",
			`library/${this.options.videoLibrary}/videos/${videoId}/reencode`,
			{
				method: "POST",
			},
		);

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
	public async listVideos(
		data: {
			page?: number;
			itemsPerPage?: number;
			search?: string;
			collection?: string;
			orderBy?: string;
		} = {},
	) {
		const videos = await this.request<BunnyCdnStream.ListVideosResponse>(
			"list",
			`library/${this.options.videoLibrary}/videos`,
			{ searchParams: data },
		);

		return {
			...videos,
			items: videos.items.map((video) => new BunnyCdnStreamVideo(video)),
		};
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
		data: {
			search?: string;
			collection?: string;
			orderBy?: string;
			itemsPerPage?: number;
		} = {},
		stop?: (
			videos: BunnyCdnStreamVideo[],
			page: number,
			totalPages: number,
		) => boolean | Promise<boolean>,
	) {
		const all: BunnyCdnStreamVideo[] = [];
		let nextPage = true;
		let page = 1;

		while (nextPage) {
			const videos = await this.listVideos({
				...data,
				page,
				itemsPerPage: data.itemsPerPage || 100,
			});

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
	 * NOTE: It is recommended to use a module like `file-type` to set the content-type of the thumbnail
	 * @returns A {@link BunnyCdnStream.SetThumbnailVideoResponse} instance.
	 * @param videoId The video ID
	 * @param thumbnail A buffer/stream/url of the thumbnail
	 * @param contentType The content type of the thumbnail, required for non-readstream inputs
	 * @example
	 * ```typescript
	 * await stream.setThumbnail("0273f24a-79d1-d0fe-97ca-b0e36bed31es", readFileSync("thumbnail.jpg"))
	 * ```
	 */
	public async setThumbnail(
		videoId: string,
		thumbnail: Buffer | ReadStream | string,
		contentType?: string,
	) {
		const headers = {
			"Content-Type":
				contentType ||
				(typeof thumbnail !== "string" && "pipe" in thumbnail
					? "application/octet-stream"
					: contentType || "image/jpeg"),
		};

		const options: KyOptions = {
			method: "POST",
			headers,
		};

		if (typeof thumbnail === "string") {
			options.searchParams = { thumbnailUrl: thumbnail };
		} else {
			options.body = thumbnail;
		}

		return this.request<BunnyCdnStream.SetThumbnailVideoResponse>(
			"setThumbnail",
			`library/${this.options.videoLibrary}/videos/${videoId}/thumbnail`,
			options,
		);
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
	public async fetchVideo(
		videoId: string,
		data: { url: string; headers?: { [key: string]: string } },
	) {
		return this.request<BunnyCdnStream.FetchVideoResponse>(
			"fetch",
			`library/${this.options.videoLibrary}/videos/${videoId}/fetch`,
			{
				method: "POST",
				json: data,
			},
		);
	}

	/**
	 * Add captions to a video
	 * @returns A {@link BunnyCdnStream.AddCaptionsVideoResponse} instance.
	 * @param videoId The video ID
	 * @param data The data to add captions with where the captions file is a buffer or base64 string
	 * @example
	 * ```typescript
	 * await stream.addCaptions("0273f24a-79d1-d0fe-97ca-b0e36bed31es", { captionsFile: readFile("./subtitles.srt"), label: "English", srclang: "en" })
	 * ```
	 */
	public async addCaptions(
		videoId: string,
		data: { captionsFile: Buffer | string; label: string; srclang: string },
	) {
		return this.request<BunnyCdnStream.AddCaptionsVideoResponse>(
			"addCaptions",
			`library/${this.options.videoLibrary}/videos/${videoId}/captions/${data.srclang}`,
			{
				method: "POST",
				json: {
					...data,
					captionsFile:
						typeof data.captionsFile === "string"
							? data.captionsFile
							: data.captionsFile.toString("base64"),
				},
			},
		);
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
		return this.request<BunnyCdnStream.DeleteCaptionsVideoResponse>(
			"deleteCaptions",
			`library/${this.options.videoLibrary}/videos/${videoId}/captions/${srclang}`,
			{ method: "DELETE" },
		);
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
	public async createCollection(
		name: string,
	): Promise<BunnyCdnStream.CreateCollectionResponse> {
		return this.request<BunnyCdnStream.CreateCollectionResponse>(
			"createCollection",
			`library/${this.options.videoLibrary}/collections`,
			{
				method: "POST",
				json: { name },
			},
		);
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
	public async getCollection(
		collectionId: string,
	): Promise<BunnyCdnStream.BunnyCdnStreamCollection> {
		return this.request<BunnyCdnStream.BunnyCdnStreamCollection>(
			"getCollection",
			`library/${this.options.videoLibrary}/collections/${collectionId}`,
		);
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
	public async listCollections(
		data: {
			page?: number;
			itemsPerPage?: number;
			search?: string;
			orderBy?: string;
		} = {},
	) {
		return this.request<BunnyCdnStream.ListCollectionsResponse>(
			"listCollections",
			`library/${this.options.videoLibrary}/collections`,
			{ searchParams: data },
		);
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
		stop?: (
			collections: BunnyCdnStream.BunnyCdnStreamCollection[],
			page: number,
			totalPages: number,
		) => boolean | Promise<boolean>,
	) {
		const all: BunnyCdnStream.BunnyCdnStreamCollection[] = [];
		let nextPage = true;
		let page = 1;
		while (nextPage) {
			const collections = await this.listCollections({
				...data,
				page,
				itemsPerPage: data.itemsPerPage || 100,
			});

			const totalPages = Math.ceil(
				collections.totalItems / collections.itemsPerPage,
			);

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
	public async updateCollection(
		collectionId: string,
		data: { name: string },
	): Promise<BunnyCdnStream.UpdateCollectionResponse> {
		return this.request<BunnyCdnStream.UpdateCollectionResponse>(
			"updateCollection",
			`library/${this.options.videoLibrary}/collections/${collectionId}`,
			{
				method: "POST",
				json: data,
			},
		);
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
	public async deleteCollection(
		collectionId: string,
	): Promise<BunnyCdnStream.DeleteCollectionResponse> {
		return this.request<BunnyCdnStream.DeleteCollectionResponse>(
			"deleteCollection",
			`library/${this.options.videoLibrary}/collections/${collectionId}`,
			{ method: "DELETE" },
		);
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
			await Promise.all(
				collections.map((collection) => this.deleteCollection(collection.guid)),
			);
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
	 * @param expirationDate The expiration date of the tus upload
	 * @example
	 * ```typescript
	 * await stream.createDirectUpload({ title: "My Video" })
	 * ```
	 */
	public async createDirectUpload(
		data: { title: string; collectionId?: string },
		expirationDate?: Date,
	): Promise<BunnyCdnStream.CreateDirectUpload> {
		// create a video
		const expirationTimestamp = Math.floor(
			(expirationDate || new Date(Date.now() + 60000)).getTime() / 1000,
		);
		const video = await this.createVideo(data);
		const hash = this.generateTUSHash(video.guid, expirationTimestamp);

		return {
			video,
			endpoint: "https://video.bunnycdn.com/tusupload",
			headers: {
				AuthorizationSignature: hash,
				AuthorizationExpire: expirationTimestamp,
				VideoId: video.guid,
				LibraryId: this.options.videoLibrary,
			},
			metadata: {
				filetype: "",
				title: data.title,
				collection: data.collectionId,
			},
		};
	}

	/**
	 * Generate a direct upload tus from a video ID
	 *
	 * @returns A {@link BunnyCdnStream.CreateDirectUpload}
	 * @param data The data to create the video with
	 * @param expirationDate The expiration date of the tus upload
	 * @example
	 * ```typescript
	 * await stream.createDirectUpload({ title: "My Video" })
	 * ```
	 */
	public async createDirectUploadFromVideoId(
		videoId: string,
		fileType: string,
		expirationDate?: Date,
	): Promise<BunnyCdnStream.CreateDirectUpload> {
		const expirationTimestamp = Math.floor(
			(expirationDate || new Date(Date.now() + 60000)).getTime() / 1000,
		);
		const hash = this.generateTUSHash(videoId, expirationTimestamp);

		const video = await this.getVideo(videoId);

		return {
			video,
			endpoint: "https://video.bunnycdn.com/tusupload",
			headers: {
				AuthorizationSignature: hash,
				AuthorizationExpire: expirationTimestamp,
				VideoId: videoId,
				LibraryId: this.options.videoLibrary,
			},
			metadata: {
				filetype: fileType,
				title: video.title,
				collection: video.collectionId,
			},
		};
	}

	private generateTUSHash(videoId: string, expirationTime: number) {
		// sha256(library_id + api_key + expiration_time + video_id)
		return createHash("sha256")
			.update(
				this.options.videoLibrary.toString() +
					this.options.apiKey.toString() +
					expirationTime.toString() +
					videoId.toString(),
			)
			.digest("hex");
	}

	// biome-ignore lint/suspicious/noExplicitAny: required by axios types
	private async request<ResponseType extends Record<string, any>>(
		name: string,
		url: string,
		options: KyOptions = {},
	): Promise<ResponseType> {
		try {
			const req = await this.ky<ResponseType>(url, options);

			const data = await req.json();

			if (typeof data === "object") {
				lowerObject(data);
			}

			if (
				"message" in data &&
				typeof data.message === "string" &&
				"statusCode" in data &&
				typeof data.statusCode === "number" &&
				data.statusCode !== 200
			) {
				throw new BunnyCdnStreamError(data.message, name, data.statusCode);
			}

			return data;
		} catch (error) {
			throw new BunnyCdnStreamError(error as HTTPError, name);
		}
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
		collectionId: "";
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
		heatmap: Record<string, string | number>;
	}

	export interface VideoPlayDataResponse {
		video: {
			videoLibraryId: number;
			guid: string;
			title: string;
			dateUploaded: string;
			views: number;
			isPublic: boolean;
			length: number;
			status: number;
			framerate: number;
			rotation: number;
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
			collectionId: string;
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
			transcodingMessages: {
				timeStamp: string;
				level: number;
				issueCode: number;
				message: string;
				value: string;
			}[];
		};
		captionsPath: string;
		seekPath: string;
		thumbnailUrl: string;
		fallbackUrl: string;
		videoPlaylistUrl: string;
		originalUrl: string;
		previewUrl: string;
		controls: string;
		enableDRM: boolean;
		drmVersion: number;
		playerKeyColor: string;
		vastTagUrl: string;
		captionsFontSize: number;
		captionsFontColor: string;
		captionsBackground: string;
		uiLanguage: string;
		allowEarlyPlay: boolean;
		tokenAuthEnabled: boolean;
		enableMP4Fallback: boolean;
		showHeatmap: boolean;
		fontFamily: string;
		playbackSpeeds: string;
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
}

export { BunnyCdnStreamVideo };
