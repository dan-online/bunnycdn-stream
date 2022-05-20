[bunnycdn-stream](../README.md) / [Exports](../modules.md) / BunnyCdnStream

# Class: BunnyCdnStream

## Table of contents

### Constructors

- [constructor](BunnyCdnStream.md#constructor)

### Properties

- [axiosOptions](BunnyCdnStream.md#axiosoptions)
- [options](BunnyCdnStream.md#options)

### Methods

- [addCaptions](BunnyCdnStream.md#addcaptions)
- [createAndUploadVideo](BunnyCdnStream.md#createanduploadvideo)
- [createVideo](BunnyCdnStream.md#createvideo)
- [deleteCaptions](BunnyCdnStream.md#deletecaptions)
- [deleteVideo](BunnyCdnStream.md#deletevideo)
- [fetchVideo](BunnyCdnStream.md#fetchvideo)
- [getOptions](BunnyCdnStream.md#getoptions)
- [getVideo](BunnyCdnStream.md#getvideo)
- [getVideoStatistics](BunnyCdnStream.md#getvideostatistics)
- [listAllVideos](BunnyCdnStream.md#listallvideos)
- [listVideos](BunnyCdnStream.md#listvideos)
- [reencodeVideo](BunnyCdnStream.md#reencodevideo)
- [request](BunnyCdnStream.md#request)
- [setThumbnail](BunnyCdnStream.md#setthumbnail)
- [updateVideo](BunnyCdnStream.md#updatevideo)
- [uploadVideo](BunnyCdnStream.md#uploadvideo)

## Constructors

### constructor

• **new BunnyCdnStream**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`Options`](../interfaces/BunnyCdnStream.Options.md) |

#### Defined in

[src/index.ts:19](https://github.com/dan-online/bunnycdn-stream/blob/0d47ebd/src/index.ts#L19)

## Properties

### axiosOptions

• **axiosOptions**: [`BunnyAxiosRequestConfig`](../interfaces/BunnyCdnStream.BunnyAxiosRequestConfig.md)

#### Defined in

[src/index.ts:7](https://github.com/dan-online/bunnycdn-stream/blob/0d47ebd/src/index.ts#L7)

___

### options

• **options**: [`Options`](../interfaces/BunnyCdnStream.Options.md)

Options for connecting and authenticating with the Bunny CDN API

#### Defined in

[src/index.ts:17](https://github.com/dan-online/bunnycdn-stream/blob/0d47ebd/src/index.ts#L17)

## Methods

### addCaptions

▸ **addCaptions**(`videoId`, `data`): `Promise`<[`AddCaptionsVideoResponse`](../interfaces/BunnyCdnStream.AddCaptionsVideoResponse.md)\>

Add captions to a video

**`example`**
```typescript
await stream.addCaptions("0273f24a-79d1-d0fe-97ca-b0e36bed31es", { captionsFile: readFile("./subtitles.srt"), label: "English", srclang: "en" })
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoId` | `string` | The video ID |
| `data` | `Object` | The data to add captions with |
| `data.captionsFile` | `string` \| `Buffer` | - |
| `data.label` | `string` | - |
| `data.srclang` | `string` | - |

#### Returns

`Promise`<[`AddCaptionsVideoResponse`](../interfaces/BunnyCdnStream.AddCaptionsVideoResponse.md)\>

A [AddCaptionsVideoResponse](../interfaces/BunnyCdnStream.AddCaptionsVideoResponse.md) instance.

#### Defined in

[src/index.ts:297](https://github.com/dan-online/bunnycdn-stream/blob/0d47ebd/src/index.ts#L297)

___

### createAndUploadVideo

▸ **createAndUploadVideo**(`file`, `data`): `Promise`<[`BunnyCdnStreamVideo`](BunnyCdnStreamVideo.md)\>

Create and upload a video in one function

**`example`**
```typescript
await stream.createAndUploadVideo(createReadStream("./file.mp4"), { title: "The best title" })
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `ReadStream` | The video file to upload as a readable stream |
| `data` | `Object` | The data to create the video with |
| `data.collectionId?` | `string` | - |
| `data.title` | `string` | - |

#### Returns

`Promise`<[`BunnyCdnStreamVideo`](BunnyCdnStreamVideo.md)\>

A [BunnyCdnStream.VideoResponse](../interfaces/BunnyCdnStream.VideoResponse.md) instance.

#### Defined in

[src/index.ts:134](https://github.com/dan-online/bunnycdn-stream/blob/0d47ebd/src/index.ts#L134)

___

### createVideo

▸ **createVideo**(`data`): `Promise`<[`BunnyCdnStreamVideo`](BunnyCdnStreamVideo.md)\>

Create a video, this does not upload the video file

**`example`**
```typescript
await stream.createVideo({ title: "The best title" })
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Object` | The data to create the video with |
| `data.collectionId?` | `string` | - |
| `data.title` | `string` | - |

#### Returns

`Promise`<[`BunnyCdnStreamVideo`](BunnyCdnStreamVideo.md)\>

A [BunnyCdnStream.VideoResponse](../interfaces/BunnyCdnStream.VideoResponse.md) instance.

#### Defined in

[src/index.ts:94](https://github.com/dan-online/bunnycdn-stream/blob/0d47ebd/src/index.ts#L94)

___

### deleteCaptions

▸ **deleteCaptions**(`videoId`, `srclang`): `Promise`<[`DeleteCaptionsVideoResponse`](../interfaces/BunnyCdnStream.DeleteCaptionsVideoResponse.md)\>

Delete captions from a video

**`example`**
```typescript
await stream.deleteCaptions("0273f24a-79d1-d0fe-97ca-b0e36bed31es", "en")
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoId` | `string` | The video ID |
| `srclang` | `string` | The specified srclang used when creating |

#### Returns

`Promise`<[`DeleteCaptionsVideoResponse`](../interfaces/BunnyCdnStream.DeleteCaptionsVideoResponse.md)\>

A [DeleteCaptionsVideoResponse](../interfaces/BunnyCdnStream.DeleteCaptionsVideoResponse.md) instance.

#### Defined in

[src/index.ts:320](https://github.com/dan-online/bunnycdn-stream/blob/0d47ebd/src/index.ts#L320)

___

### deleteVideo

▸ **deleteVideo**(`videoId`): `Promise`<[`DeleteVideoResponse`](../interfaces/BunnyCdnStream.DeleteVideoResponse.md)\>

Delete a video

**`example`**
```typescript
await stream.deleteVideo("0273f24a-79d1-d0fe-97ca-b0e36bed31es")
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoId` | `string` | The video ID |

#### Returns

`Promise`<[`DeleteVideoResponse`](../interfaces/BunnyCdnStream.DeleteVideoResponse.md)\>

A [DeleteVideoResponse](../interfaces/BunnyCdnStream.DeleteVideoResponse.md) instance.

#### Defined in

[src/index.ts:77](https://github.com/dan-online/bunnycdn-stream/blob/0d47ebd/src/index.ts#L77)

___

### fetchVideo

▸ **fetchVideo**(`videoId`, `data`): `Promise`<[`FetchVideoResponse`](../interfaces/BunnyCdnStream.FetchVideoResponse.md)\>

Fetch a video

NOTE: This does not return a video, more a confirmation that a video will be fetched from the url with specific headers

**`example`**
```typescript
await stream.fetchVideo("0273f24a-79d1-d0fe-97ca-b0e36bed31es", { url: "https://example.com/file.mp4" })
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoId` | `string` | The video ID |
| `data` | `Object` | The data to fetch the video from |
| `data.headers?` | `Object` | - |
| `data.url` | `string` | - |

#### Returns

`Promise`<[`FetchVideoResponse`](../interfaces/BunnyCdnStream.FetchVideoResponse.md)\>

A [FetchVideoResponse](../interfaces/BunnyCdnStream.FetchVideoResponse.md) instance

#### Defined in

[src/index.ts:279](https://github.com/dan-online/bunnycdn-stream/blob/0d47ebd/src/index.ts#L279)

___

### getOptions

▸ `Private` **getOptions**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `adapter?` | `AxiosAdapter` |
| `auth?` | `AxiosBasicCredentials` |
| `baseURL?` | `string` |
| `cancelToken?` | `CancelToken` |
| `data?` | `any` |
| `decompress?` | `boolean` |
| `env?` | { `FormData?`: (...`args`: `any`[]) => `object`  } |
| `env.FormData?` | (...`args`: `any`[]) => `object` |
| `headers` | `AxiosRequestHeaders` |
| `httpAgent?` | `any` |
| `httpsAgent?` | `any` |
| `insecureHTTPParser?` | `boolean` |
| `maxBodyLength?` | `number` |
| `maxContentLength?` | `number` |
| `maxRedirects?` | `number` |
| `method?` | `string` |
| `params?` | `any` |
| `proxy?` | ``false`` \| `AxiosProxyConfig` |
| `responseEncoding?` | `string` |
| `responseType?` | `ResponseType` |
| `signal?` | `AbortSignal` |
| `socketPath?` | ``null`` \| `string` |
| `timeout?` | `number` |
| `timeoutErrorMessage?` | `string` |
| `transformRequest?` | `AxiosRequestTransformer` \| `AxiosRequestTransformer`[] |
| `transformResponse?` | `AxiosResponseTransformer` \| `AxiosResponseTransformer`[] |
| `transitional?` | `TransitionalOptions` |
| `url?` | `string` |
| `validateStatus?` | ``null`` \| (`status`: `number`) => `boolean` |
| `withCredentials?` | `boolean` |
| `xsrfCookieName?` | `string` |
| `xsrfHeaderName?` | `string` |
| `beforeRedirect?` | (`options`: `Record`<`string`, `any`\>, `responseDetails`: { `headers`: `Record`<`string`, `string`\>  }) => `void` |
| `onDownloadProgress?` | (`progressEvent`: `any`) => `void` |
| `onUploadProgress?` | (`progressEvent`: `any`) => `void` |
| `paramsSerializer?` | (`params`: `any`) => `string` |

#### Defined in

[src/index.ts:336](https://github.com/dan-online/bunnycdn-stream/blob/0d47ebd/src/index.ts#L336)

___

### getVideo

▸ **getVideo**(`videoId`): `Promise`<[`BunnyCdnStreamVideo`](BunnyCdnStreamVideo.md)\>

Retrieve a video from BunnyCdn

**`example`**
```typescript
await stream.getVideo("0273f24a-79d1-d0fe-97ca-b0e36bed31es")
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoId` | `string` | The video ID |

#### Returns

`Promise`<[`BunnyCdnStreamVideo`](BunnyCdnStreamVideo.md)\>

A [BunnyCdnStream.VideoResponse](../interfaces/BunnyCdnStream.VideoResponse.md) instance.

#### Defined in

[src/index.ts:33](https://github.com/dan-online/bunnycdn-stream/blob/0d47ebd/src/index.ts#L33)

___

### getVideoStatistics

▸ **getVideoStatistics**(`data?`): `Promise`<[`VideoStatisticsResponse`](../interfaces/BunnyCdnStream.VideoStatisticsResponse.md)\>

Get video statistics

**`example`**
```typescript
await stream.getVideoStatistics({ videoId: "0273f24a-79d1-d0fe-97ca-b0e36bed31es" })
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Object` | The data to fetch video statistics with |
| `data.dateFrom?` | `string` | - |
| `data.dateTo?` | `string` | - |
| `data.hourly?` | `boolean` | - |
| `data.videoId?` | `string` | - |

#### Returns

`Promise`<[`VideoStatisticsResponse`](../interfaces/BunnyCdnStream.VideoStatisticsResponse.md)\>

A [VideoStatisticsResponse](../interfaces/BunnyCdnStream.VideoStatisticsResponse.md) instance.

#### Defined in

[src/index.ts:155](https://github.com/dan-online/bunnycdn-stream/blob/0d47ebd/src/index.ts#L155)

___

### listAllVideos

▸ **listAllVideos**(`data?`, `stop?`): `Promise`<[`BunnyCdnStreamVideo`](BunnyCdnStreamVideo.md)[]\>

List all videos with an optional callback between each page

**`example`**
```typescript
await stream.listAllVideos()
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Object` | The options to list videos with |
| `data.collection?` | `string` | - |
| `data.itemsPerPage?` | `number` | - |
| `data.orderBy?` | `string` | - |
| `data.search?` | `string` | - |
| `stop?` | (`videos`: [`BunnyCdnStreamVideo`](BunnyCdnStreamVideo.md)[], `page`: `number`, `totalPages`: `number`) => `boolean` | The callback that if returns ``true`` stops the iteration |

#### Returns

`Promise`<[`BunnyCdnStreamVideo`](BunnyCdnStreamVideo.md)[]\>

An array of [VideoStatisticsResponse](../interfaces/BunnyCdnStream.VideoStatisticsResponse.md) instances.

#### Defined in

[src/index.ts:219](https://github.com/dan-online/bunnycdn-stream/blob/0d47ebd/src/index.ts#L219)

___

### listVideos

▸ **listVideos**(`data?`): `Promise`<{ `currentPage`: `number` ; `items`: [`BunnyCdnStreamVideo`](BunnyCdnStreamVideo.md)[] ; `itemsPerPage`: `number` ; `totalItems`: `number`  }\>

List videos

**`example`**
```typescript
await stream.listVideos({ page: 2, search: "The best title", itemsPerPage: 10 })
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Object` | The options to list videos with |
| `data.collection?` | `string` | - |
| `data.itemsPerPage?` | `number` | - |
| `data.orderBy?` | `string` | - |
| `data.page?` | `number` | - |
| `data.search?` | `string` | - |

#### Returns

`Promise`<{ `currentPage`: `number` ; `items`: [`BunnyCdnStreamVideo`](BunnyCdnStreamVideo.md)[] ; `itemsPerPage`: `number` ; `totalItems`: `number`  }\>

An array of [VideoStatisticsResponse](../interfaces/BunnyCdnStream.VideoStatisticsResponse.md) instances.

#### Defined in

[src/index.ts:200](https://github.com/dan-online/bunnycdn-stream/blob/0d47ebd/src/index.ts#L200)

___

### reencodeVideo

▸ **reencodeVideo**(`videoId`): `Promise`<[`BunnyCdnStreamVideo`](BunnyCdnStreamVideo.md)\>

Force reencode a video

NOTE: This sometimes fails and is not very reliable, use with caution

**`example`**
```typescript
await stream.reencodeVideo("0273f24a-79d1-d0fe-97ca-b0e36bed31es")
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoId` | `string` | The video ID |

#### Returns

`Promise`<[`BunnyCdnStreamVideo`](BunnyCdnStreamVideo.md)\>

A [BunnyCdnStream.VideoResponse](../interfaces/BunnyCdnStream.VideoResponse.md) instance.

#### Defined in

[src/index.ts:181](https://github.com/dan-online/bunnycdn-stream/blob/0d47ebd/src/index.ts#L181)

___

### request

▸ `Private` **request**<`ResponseType`\>(`options`, `name`): `Promise`<`ResponseType`\>

#### Type parameters

| Name |
| :------ |
| `ResponseType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `AxiosRequestConfig`<`any`\> |
| `name` | `string` |

#### Returns

`Promise`<`ResponseType`\>

#### Defined in

[src/index.ts:327](https://github.com/dan-online/bunnycdn-stream/blob/0d47ebd/src/index.ts#L327)

___

### setThumbnail

▸ **setThumbnail**(`videoId`, `url`): `Promise`<[`SetThumbnailVideoResponse`](../interfaces/BunnyCdnStream.SetThumbnailVideoResponse.md)\>

Set the thumbnail

NOTE: This does not work as BunnyCDN describe but feel free to try

**`example`**
```typescript
await stream.setThumbnail("0273f24a-79d1-d0fe-97ca-b0e36bed31es", "thumbnail_1.jpg")
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoId` | `string` | The video ID |
| `url` | `string` | The url of the thumbnail |

#### Returns

`Promise`<[`SetThumbnailVideoResponse`](../interfaces/BunnyCdnStream.SetThumbnailVideoResponse.md)\>

A [SetThumbnailVideoResponse](../interfaces/BunnyCdnStream.SetThumbnailVideoResponse.md) instance.

#### Defined in

[src/index.ts:259](https://github.com/dan-online/bunnycdn-stream/blob/0d47ebd/src/index.ts#L259)

___

### updateVideo

▸ **updateVideo**(`videoId`, `data?`): `Promise`<[`VideoResponse`](../interfaces/BunnyCdnStream.VideoResponse.md)\>

Update video information

**`example`**
```typescript
await stream.updateVideo("0273f24a-79d1-d0fe-97ca-b0e36bed31es", { title: "New title" })
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoId` | `string` | The video ID |
| `data` | `Object` | The data to update |
| `data.chapters?` | `Object` | - |
| `data.chapters.end` | `number` | - |
| `data.chapters.start` | `number` | - |
| `data.chapters.title` | `string` | - |
| `data.collectionId?` | `string` | - |
| `data.moments?` | `Object` | - |
| `data.moments.label` | `string` | - |
| `data.moments.timestamp` | `number` | - |
| `data.title?` | `string` | - |

#### Returns

`Promise`<[`VideoResponse`](../interfaces/BunnyCdnStream.VideoResponse.md)\>

A [BunnyCdnStream.VideoResponse](../interfaces/BunnyCdnStream.VideoResponse.md) instance.

#### Defined in

[src/index.ts:50](https://github.com/dan-online/bunnycdn-stream/blob/0d47ebd/src/index.ts#L50)

___

### uploadVideo

▸ **uploadVideo**(`file`, `videoId`): `Promise`<[`UploadVideoResponse`](../interfaces/BunnyCdnStream.UploadVideoResponse.md)\>

Upload video, this does not create the video and requires a created video

**`example`**
```typescript
await stream.uploadVideo(createReadStream("./file.mp4"), "0273f24a-79d1-d0fe-97ca-b0e36bed31es")
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `ReadStream` | The video file to upload as a readable stream |
| `videoId` | `string` | The video id to upload to of a created video |

#### Returns

`Promise`<[`UploadVideoResponse`](../interfaces/BunnyCdnStream.UploadVideoResponse.md)\>

A [UploadVideoResponse](../interfaces/BunnyCdnStream.UploadVideoResponse.md) instance.

#### Defined in

[src/index.ts:114](https://github.com/dan-online/bunnycdn-stream/blob/0d47ebd/src/index.ts#L114)
