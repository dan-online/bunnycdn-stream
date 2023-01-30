[bunnycdn-stream](../README.md) / [Exports](../modules.md) / BunnyCdnStream

# Class: BunnyCdnStream

## Table of contents

### Constructors

- [constructor](BunnyCdnStream-1.md#constructor)

### Properties

- [axiosOptions](BunnyCdnStream-1.md#axiosoptions)
- [options](BunnyCdnStream-1.md#options)

### Methods

- [addCaptions](BunnyCdnStream-1.md#addcaptions)
- [createAndUploadVideo](BunnyCdnStream-1.md#createanduploadvideo)
- [createDirectUpload](BunnyCdnStream-1.md#createdirectupload)
- [createVideo](BunnyCdnStream-1.md#createvideo)
- [deleteCaptions](BunnyCdnStream-1.md#deletecaptions)
- [deleteVideo](BunnyCdnStream-1.md#deletevideo)
- [fetchVideo](BunnyCdnStream-1.md#fetchvideo)
- [generateTUSHash](BunnyCdnStream-1.md#generatetushash)
- [getOptions](BunnyCdnStream-1.md#getoptions)
- [getVideo](BunnyCdnStream-1.md#getvideo)
- [getVideoHeatmap](BunnyCdnStream-1.md#getvideoheatmap)
- [getVideoStatistics](BunnyCdnStream-1.md#getvideostatistics)
- [listAllVideos](BunnyCdnStream-1.md#listallvideos)
- [listVideos](BunnyCdnStream-1.md#listvideos)
- [reencodeVideo](BunnyCdnStream-1.md#reencodevideo)
- [request](BunnyCdnStream-1.md#request)
- [setThumbnail](BunnyCdnStream-1.md#setthumbnail)
- [updateVideo](BunnyCdnStream-1.md#updatevideo)
- [uploadVideo](BunnyCdnStream-1.md#uploadvideo)

## Constructors

### constructor

• **new BunnyCdnStream**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`Options`](../interfaces/BunnyCdnStream.Options.md) |

#### Defined in

[src/index.ts:19](https://github.com/dan-online/bunnycdn-stream/blob/ddcf8f3/src/index.ts#L19)

## Properties

### axiosOptions

• **axiosOptions**: [`BunnyAxiosRequestConfig`](../interfaces/BunnyCdnStream.BunnyAxiosRequestConfig.md)

#### Defined in

[src/index.ts:7](https://github.com/dan-online/bunnycdn-stream/blob/ddcf8f3/src/index.ts#L7)

___

### options

• **options**: [`Options`](../interfaces/BunnyCdnStream.Options.md)

Options for connecting and authenticating with the Bunny CDN API

#### Defined in

[src/index.ts:17](https://github.com/dan-online/bunnycdn-stream/blob/ddcf8f3/src/index.ts#L17)

## Methods

### addCaptions

▸ **addCaptions**(`videoId`, `data`): `Promise`<[`AddCaptionsVideoResponse`](../interfaces/BunnyCdnStream.AddCaptionsVideoResponse.md)\>

Add captions to a video

**`Example`**

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

[src/index.ts:316](https://github.com/dan-online/bunnycdn-stream/blob/ddcf8f3/src/index.ts#L316)

___

### createAndUploadVideo

▸ **createAndUploadVideo**(`file`, `data`): `Promise`<[`VideoResponse`](../interfaces/BunnyCdnStream.VideoResponse.md)\>

Create and upload a video in one function

**`Example`**

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

`Promise`<[`VideoResponse`](../interfaces/BunnyCdnStream.VideoResponse.md)\>

A [VideoResponse](../interfaces/BunnyCdnStream.VideoResponse.md) instance.

#### Defined in

[src/index.ts:137](https://github.com/dan-online/bunnycdn-stream/blob/ddcf8f3/src/index.ts#L137)

___

### createDirectUpload

▸ **createDirectUpload**(`data`, `expirationTime?`): `Promise`<[`CreateDirectUpload`](../interfaces/BunnyCdnStream.CreateDirectUpload.md)\>

Generate a direct upload tus

NOTE: metadata.filetype is required for the tus upload to work

**`Example`**

```typescript
await stream.createDirectUpload({ title: "My Video" })
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `data` | `Object` | `undefined` | The data to create the video with |
| `data.collection?` | `string` | `undefined` | - |
| `data.title` | `string` | `undefined` | - |
| `expirationTime` | `number` | `3600` | The expiration time of the tus upload |

#### Returns

`Promise`<[`CreateDirectUpload`](../interfaces/BunnyCdnStream.CreateDirectUpload.md)\>

A [CreateDirectUpload](../interfaces/BunnyCdnStream.CreateDirectUpload.md)

#### Defined in

[src/index.ts:358](https://github.com/dan-online/bunnycdn-stream/blob/ddcf8f3/src/index.ts#L358)

___

### createVideo

▸ **createVideo**(`data`): `Promise`<[`VideoResponse`](../interfaces/BunnyCdnStream.VideoResponse.md)\>

Create a video, this does not upload the video file

**`Example`**

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

`Promise`<[`VideoResponse`](../interfaces/BunnyCdnStream.VideoResponse.md)\>

A [VideoResponse](../interfaces/BunnyCdnStream.VideoResponse.md) instance.

#### Defined in

[src/index.ts:95](https://github.com/dan-online/bunnycdn-stream/blob/ddcf8f3/src/index.ts#L95)

___

### deleteCaptions

▸ **deleteCaptions**(`videoId`, `srclang`): `Promise`<[`DeleteCaptionsVideoResponse`](../interfaces/BunnyCdnStream.DeleteCaptionsVideoResponse.md)\>

Delete captions from a video

**`Example`**

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

[src/index.ts:339](https://github.com/dan-online/bunnycdn-stream/blob/ddcf8f3/src/index.ts#L339)

___

### deleteVideo

▸ **deleteVideo**(`videoId`): `Promise`<[`DeleteVideoResponse`](../interfaces/BunnyCdnStream.DeleteVideoResponse.md)\>

Delete a video

**`Example`**

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

[src/index.ts:78](https://github.com/dan-online/bunnycdn-stream/blob/ddcf8f3/src/index.ts#L78)

___

### fetchVideo

▸ **fetchVideo**(`videoId`, `data`): `Promise`<[`FetchVideoResponse`](../interfaces/BunnyCdnStream.FetchVideoResponse.md)\>

Fetch a video

NOTE: This does not return a video, more a confirmation that a video will be fetched from the url with specific headers

**`Example`**

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

[src/index.ts:298](https://github.com/dan-online/bunnycdn-stream/blob/ddcf8f3/src/index.ts#L298)

___

### generateTUSHash

▸ `Private` **generateTUSHash**(`videoId`, `expirationTime`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `videoId` | `string` |
| `expirationTime` | `number` |

#### Returns

`string`

#### Defined in

[src/index.ts:379](https://github.com/dan-online/bunnycdn-stream/blob/ddcf8f3/src/index.ts#L379)

___

### getOptions

▸ `Private` **getOptions**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `adapter?` | `AxiosAdapterConfig` \| `AxiosAdapterConfig`[] |
| `auth?` | `AxiosBasicCredentials` |
| `baseURL?` | `string` |
| `beforeRedirect?` | (`options`: `Record`<`string`, `any`\>, `responseDetails`: { `headers`: `Record`<`string`, `string`\>  }) => `void` |
| `cancelToken?` | `CancelToken` |
| `data?` | `any` |
| `decompress?` | `boolean` |
| `env?` | { `FormData?`: (...`args`: `any`[]) => `object`  } |
| `env.FormData?` | (...`args`: `any`[]) => `object` |
| `formSerializer?` | `FormSerializerOptions` |
| `headers` | `AxiosHeaders` |
| `httpAgent?` | `any` |
| `httpsAgent?` | `any` |
| `insecureHTTPParser?` | `boolean` |
| `maxBodyLength?` | `number` |
| `maxContentLength?` | `number` |
| `maxRate?` | `number` \| [`number`, `number`] |
| `maxRedirects?` | `number` |
| `method?` | `string` |
| `onDownloadProgress?` | (`progressEvent`: `AxiosProgressEvent`) => `void` |
| `onUploadProgress?` | (`progressEvent`: `AxiosProgressEvent`) => `void` |
| `params?` | `any` |
| `paramsSerializer?` | `ParamsSerializerOptions` |
| `proxy?` | ``false`` \| `AxiosProxyConfig` |
| `responseEncoding?` | `string` |
| `responseType?` | `ResponseType` |
| `signal?` | `GenericAbortSignal` |
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

#### Defined in

[src/index.ts:395](https://github.com/dan-online/bunnycdn-stream/blob/ddcf8f3/src/index.ts#L395)

___

### getVideo

▸ **getVideo**(`videoId`): `Promise`<[`BunnyCdnStreamVideo`](BunnyCdnStreamVideo.md)\>

Retrieve a video from BunnyCdn

**`Example`**

```typescript
await stream.getVideo("0273f24a-79d1-d0fe-97ca-b0e36bed31es")
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoId` | `string` | The video ID |

#### Returns

`Promise`<[`BunnyCdnStreamVideo`](BunnyCdnStreamVideo.md)\>

A [VideoResponse](../interfaces/BunnyCdnStream.VideoResponse.md) instance.

#### Defined in

[src/index.ts:33](https://github.com/dan-online/bunnycdn-stream/blob/ddcf8f3/src/index.ts#L33)

___

### getVideoHeatmap

▸ **getVideoHeatmap**(`videoId`): `Promise`<[`VideoHeatmapResponse`](../interfaces/BunnyCdnStream.VideoHeatmapResponse.md)\>

Get video statistics

**`Example`**

```typescript
await stream.getVideoHeatmap("0273f24a-79d1-d0fe-97ca-b0e36bed31es")
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoId` | `string` | The video id to get heatmap info from |

#### Returns

`Promise`<[`VideoHeatmapResponse`](../interfaces/BunnyCdnStream.VideoHeatmapResponse.md)\>

A [VideoHeatmapResponse](../interfaces/BunnyCdnStream.VideoHeatmapResponse.md) instance.

#### Defined in

[src/index.ts:158](https://github.com/dan-online/bunnycdn-stream/blob/ddcf8f3/src/index.ts#L158)

___

### getVideoStatistics

▸ **getVideoStatistics**(`videoId`, `data?`): `Promise`<[`VideoStatisticsResponse`](../interfaces/BunnyCdnStream.VideoStatisticsResponse.md)\>

Get video statistics

**`Example`**

```typescript
await stream.getVideoStatistics("0273f24a-79d1-d0fe-97ca-b0e36bed31es")
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoId` | `string` | - |
| `data` | `Object` | The data to fetch video statistics with |
| `data.dateFrom?` | `string` | - |
| `data.dateTo?` | `string` | - |
| `data.hourly?` | `boolean` | - |

#### Returns

`Promise`<[`VideoStatisticsResponse`](../interfaces/BunnyCdnStream.VideoStatisticsResponse.md)\>

A [VideoStatisticsResponse](../interfaces/BunnyCdnStream.VideoStatisticsResponse.md) instance.

#### Defined in

[src/index.ts:174](https://github.com/dan-online/bunnycdn-stream/blob/ddcf8f3/src/index.ts#L174)

___

### listAllVideos

▸ **listAllVideos**(`data?`, `stop?`): `Promise`<[`BunnyCdnStreamVideo`](BunnyCdnStreamVideo.md)[]\>

List all videos with an optional callback between each page

**`Example`**

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

[src/index.ts:238](https://github.com/dan-online/bunnycdn-stream/blob/ddcf8f3/src/index.ts#L238)

___

### listVideos

▸ **listVideos**(`data?`): `Promise`<{ `currentPage`: `number` ; `items`: [`BunnyCdnStreamVideo`](BunnyCdnStreamVideo.md)[] ; `itemsPerPage`: `number` ; `totalItems`: `number`  }\>

List videos

**`Example`**

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

[src/index.ts:219](https://github.com/dan-online/bunnycdn-stream/blob/ddcf8f3/src/index.ts#L219)

___

### reencodeVideo

▸ **reencodeVideo**(`videoId`): `Promise`<[`BunnyCdnStreamVideo`](BunnyCdnStreamVideo.md)\>

Force reencode a video

NOTE: This sometimes fails and is not very reliable, use with caution

**`Example`**

```typescript
await stream.reencodeVideo("0273f24a-79d1-d0fe-97ca-b0e36bed31es")
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoId` | `string` | The video ID |

#### Returns

`Promise`<[`BunnyCdnStreamVideo`](BunnyCdnStreamVideo.md)\>

A [VideoResponse](../interfaces/BunnyCdnStream.VideoResponse.md) instance.

#### Defined in

[src/index.ts:200](https://github.com/dan-online/bunnycdn-stream/blob/ddcf8f3/src/index.ts#L200)

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

[src/index.ts:386](https://github.com/dan-online/bunnycdn-stream/blob/ddcf8f3/src/index.ts#L386)

___

### setThumbnail

▸ **setThumbnail**(`videoId`, `url`): `Promise`<[`SetThumbnailVideoResponse`](../interfaces/BunnyCdnStream.SetThumbnailVideoResponse.md)\>

Set the thumbnail

NOTE: This does not work as BunnyCDN describes but feel free to try, I believe it actually means a thumbnail it has provided

**`Example`**

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

[src/index.ts:278](https://github.com/dan-online/bunnycdn-stream/blob/ddcf8f3/src/index.ts#L278)

___

### updateVideo

▸ **updateVideo**(`videoId`, `data?`): `Promise`<[`VideoResponse`](../interfaces/BunnyCdnStream.VideoResponse.md)\>

Update video information

**`Example`**

```typescript
await stream.updateVideo("0273f24a-79d1-d0fe-97ca-b0e36bed31es", { title: "New title" })
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoId` | `string` | The video ID |
| `data` | `Object` | The data to update |
| `data.chapters?` | { `end`: `number` ; `start`: `number` ; `title`: `string`  }[] | - |
| `data.collectionId?` | `string` | - |
| `data.metaTags?` | { `property`: `string` ; `value`: `string`  }[] | - |
| `data.moments?` | { `label`: `string` ; `timestamp`: `number`  }[] | - |
| `data.title?` | `string` | - |

#### Returns

`Promise`<[`VideoResponse`](../interfaces/BunnyCdnStream.VideoResponse.md)\>

A [VideoResponse](../interfaces/BunnyCdnStream.VideoResponse.md) instance.

#### Defined in

[src/index.ts:50](https://github.com/dan-online/bunnycdn-stream/blob/ddcf8f3/src/index.ts#L50)

___

### uploadVideo

▸ **uploadVideo**(`file`, `videoId`, `data?`): `Promise`<[`UploadVideoResponse`](../interfaces/BunnyCdnStream.UploadVideoResponse.md)\>

Upload video, this does not create the video and requires a created video

**`Example`**

```typescript
await stream.uploadVideo(createReadStream("./file.mp4"), "0273f24a-79d1-d0fe-97ca-b0e36bed31es")
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `ReadStream` | The video file to upload as a readable stream |
| `videoId` | `string` | The video id to upload to of a created video |
| `data` | `Object` | Optional paramaters such as enabledResolutions |
| `data.enabledResolutions?` | `string` | - |

#### Returns

`Promise`<[`UploadVideoResponse`](../interfaces/BunnyCdnStream.UploadVideoResponse.md)\>

A [UploadVideoResponse](../interfaces/BunnyCdnStream.UploadVideoResponse.md) instance.

#### Defined in

[src/index.ts:116](https://github.com/dan-online/bunnycdn-stream/blob/ddcf8f3/src/index.ts#L116)
