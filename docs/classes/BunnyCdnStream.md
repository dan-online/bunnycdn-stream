[**bunnycdn-stream**](../README.md) • **Docs**

***

[bunnycdn-stream](../globals.md) / BunnyCdnStream

# Class: BunnyCdnStream

## Constructors

### new BunnyCdnStream()

> **new BunnyCdnStream**(`options`): [`BunnyCdnStream`](BunnyCdnStream.md)

#### Parameters

• **options**: [`Options`](../namespaces/BunnyCdnStream/interfaces/Options.md)

#### Returns

[`BunnyCdnStream`](BunnyCdnStream.md)

#### Source

[src/index.ts:26](https://github.com/dan-online/bunnycdn-stream/blob/d70c6fd/src/index.ts#L26)

## Properties

### axiosOptions

> **axiosOptions**: [`BunnyAxiosRequestConfig`](../namespaces/BunnyCdnStream/interfaces/BunnyAxiosRequestConfig.md)

#### Source

[src/index.ts:10](https://github.com/dan-online/bunnycdn-stream/blob/d70c6fd/src/index.ts#L10)

***

### options

> **options**: [`Options`](../namespaces/BunnyCdnStream/interfaces/Options.md)

Options for connecting and authenticating with the Bunny CDN API

#### Source

[src/index.ts:24](https://github.com/dan-online/bunnycdn-stream/blob/d70c6fd/src/index.ts#L24)

## Methods

### addCaptions()

> **addCaptions**(`videoId`, `data`): `Promise`\<[`AddCaptionsVideoResponse`](../namespaces/BunnyCdnStream/interfaces/AddCaptionsVideoResponse.md)\>

Add captions to a video

#### Parameters

• **videoId**: `string`

The video ID

• **data**

The data to add captions with where the captions file is a buffer or base64 string

• **data.captionsFile**: `string` \| `Buffer`

• **data.label**: `string`

• **data.srclang**: `string`

#### Returns

`Promise`\<[`AddCaptionsVideoResponse`](../namespaces/BunnyCdnStream/interfaces/AddCaptionsVideoResponse.md)\>

A [AddCaptionsVideoResponse](../namespaces/BunnyCdnStream/interfaces/AddCaptionsVideoResponse.md) instance.

#### Example

```typescript
await stream.addCaptions("0273f24a-79d1-d0fe-97ca-b0e36bed31es", { captionsFile: readFile("./subtitles.srt"), label: "English", srclang: "en" })
```

#### Source

[src/index.ts:378](https://github.com/dan-online/bunnycdn-stream/blob/d70c6fd/src/index.ts#L378)

***

### createAndUploadVideo()

> **createAndUploadVideo**(`file`, `data`): `Promise`\<[`BunnyCdnStreamVideo`](BunnyCdnStreamVideo.md)\>

Create and upload a video in one function

#### Parameters

• **file**: `ReadStream`

The video file to upload as a readable stream

• **data**

The data to create the video with

• **data.collectionId?**: `string`

• **data.title**: `string`

#### Returns

`Promise`\<[`BunnyCdnStreamVideo`](BunnyCdnStreamVideo.md)\>

A [VideoResponse](../namespaces/BunnyCdnStream/interfaces/VideoResponse.md) instance.

#### Example

```typescript
await stream.createAndUploadVideo(createReadStream("./file.mp4"), { title: "The best title" })
```

#### Source

[src/index.ts:166](https://github.com/dan-online/bunnycdn-stream/blob/d70c6fd/src/index.ts#L166)

***

### createCollection()

> **createCollection**(`name`): `Promise`\<[`CreateCollectionResponse`](../namespaces/BunnyCdnStream/interfaces/CreateCollectionResponse.md)\>

Create a collection

#### Parameters

• **name**: `string`

The collection name

#### Returns

`Promise`\<[`CreateCollectionResponse`](../namespaces/BunnyCdnStream/interfaces/CreateCollectionResponse.md)\>

A [CreateCollectionResponse](../namespaces/BunnyCdnStream/interfaces/CreateCollectionResponse.md) instance.

#### Example

```typescript
await stream.createCollection("New Collection")
```

#### Source

[src/index.ts:417](https://github.com/dan-online/bunnycdn-stream/blob/d70c6fd/src/index.ts#L417)

***

### createDirectUpload()

> **createDirectUpload**(`data`, `expirationDate`?): `Promise`\<[`CreateDirectUpload`](../namespaces/BunnyCdnStream/interfaces/CreateDirectUpload.md)\>

Generate a direct upload tus

NOTE: metadata.filetype is required for the tus upload to work

#### Parameters

• **data**

The data to create the video with

• **data.collectionId?**: `string`

• **data.title?**: `string`

• **expirationDate?**: `Date`

#### Returns

`Promise`\<[`CreateDirectUpload`](../namespaces/BunnyCdnStream/interfaces/CreateDirectUpload.md)\>

A [CreateDirectUpload](../namespaces/BunnyCdnStream/interfaces/CreateDirectUpload.md)

#### Example

```typescript
await stream.createDirectUpload({ title: "My Video" })
```

#### Source

[src/index.ts:572](https://github.com/dan-online/bunnycdn-stream/blob/d70c6fd/src/index.ts#L572)

***

### createVideo()

> **createVideo**(`data`): `Promise`\<[`BunnyCdnStreamVideo`](BunnyCdnStreamVideo.md)\>

Create a video, this does not upload the video file

#### Parameters

• **data**

The data to create the video with

• **data.collectionId?**: `string`

• **data.title**: `string`

#### Returns

`Promise`\<[`BunnyCdnStreamVideo`](BunnyCdnStreamVideo.md)\>

A [VideoResponse](../namespaces/BunnyCdnStream/interfaces/VideoResponse.md) instance.

#### Example

```typescript
await stream.createVideo({ title: "The best title" })
```

#### Source

[src/index.ts:123](https://github.com/dan-online/bunnycdn-stream/blob/d70c6fd/src/index.ts#L123)

***

### deleteAllCollections()

> **deleteAllCollections**(): `Promise`\<`void`\>

Delete all collections

#### Returns

`Promise`\<`void`\>

void

#### Example

```typescript
await stream.deleteAllCollections()
```

#### Source

[src/index.ts:549](https://github.com/dan-online/bunnycdn-stream/blob/d70c6fd/src/index.ts#L549)

***

### deleteAllVideos()

> **deleteAllVideos**(): `Promise`\<`void`\>

Delete all videos

NOTE: This uses the listVideos method and will iterate over all pages and delete all videos per page before continuing to the next page.

#### Returns

`Promise`\<`void`\>

void

#### Example

```typescript
await stream.deleteAllVideos();
```

#### Source

[src/index.ts:103](https://github.com/dan-online/bunnycdn-stream/blob/d70c6fd/src/index.ts#L103)

***

### deleteCaptions()

> **deleteCaptions**(`videoId`, `srclang`): `Promise`\<[`DeleteCaptionsVideoResponse`](../namespaces/BunnyCdnStream/interfaces/DeleteCaptionsVideoResponse.md)\>

Delete captions from a video

#### Parameters

• **videoId**: `string`

The video ID

• **srclang**: `string`

The specified srclang used when creating

#### Returns

`Promise`\<[`DeleteCaptionsVideoResponse`](../namespaces/BunnyCdnStream/interfaces/DeleteCaptionsVideoResponse.md)\>

A [DeleteCaptionsVideoResponse](../namespaces/BunnyCdnStream/interfaces/DeleteCaptionsVideoResponse.md) instance.

#### Example

```typescript
await stream.deleteCaptions("0273f24a-79d1-d0fe-97ca-b0e36bed31es", "en")
```

#### Source

[src/index.ts:401](https://github.com/dan-online/bunnycdn-stream/blob/d70c6fd/src/index.ts#L401)

***

### deleteCollection()

> **deleteCollection**(`collectionId`): `Promise`\<[`DeleteCollectionResponse`](../namespaces/BunnyCdnStream/interfaces/DeleteCollectionResponse.md)\>

Delete a collection

#### Parameters

• **collectionId**: `string`

The collection ID

#### Returns

`Promise`\<[`DeleteCollectionResponse`](../namespaces/BunnyCdnStream/interfaces/DeleteCollectionResponse.md)\>

A [DeleteCollectionResponse](../namespaces/BunnyCdnStream/interfaces/DeleteCollectionResponse.md) instance.

#### Example

```typescript
await stream.deleteCollection("0273f24a-79d1-d0fe-97ca-b0e36bed31es")
```

#### Source

[src/index.ts:534](https://github.com/dan-online/bunnycdn-stream/blob/d70c6fd/src/index.ts#L534)

***

### deleteVideo()

> **deleteVideo**(`videoId`): `Promise`\<[`DeleteVideoResponse`](../namespaces/BunnyCdnStream/interfaces/DeleteVideoResponse.md)\>

Delete a video

#### Parameters

• **videoId**: `string`

The video ID

#### Returns

`Promise`\<[`DeleteVideoResponse`](../namespaces/BunnyCdnStream/interfaces/DeleteVideoResponse.md)\>

A [DeleteVideoResponse](../namespaces/BunnyCdnStream/interfaces/DeleteVideoResponse.md) instance.

#### Example

```typescript
await stream.deleteVideo("0273f24a-79d1-d0fe-97ca-b0e36bed31es")
```

#### Source

[src/index.ts:85](https://github.com/dan-online/bunnycdn-stream/blob/d70c6fd/src/index.ts#L85)

***

### fetchVideo()

> **fetchVideo**(`videoId`, `data`): `Promise`\<[`FetchVideoResponse`](../namespaces/BunnyCdnStream/interfaces/FetchVideoResponse.md)\>

Upload a video using a URL

NOTE: This will not work if the video is not public, and the thumbnail/preview will not be regenerated for existing videos

#### Parameters

• **videoId**: `string`

The video ID

• **data**

The data with video url to fetch and optional headers

• **data.headers?**

• **data.url**: `string`

#### Returns

`Promise`\<[`FetchVideoResponse`](../namespaces/BunnyCdnStream/interfaces/FetchVideoResponse.md)\>

A [FetchVideoResponse](../namespaces/BunnyCdnStream/interfaces/FetchVideoResponse.md) instance

#### Example

```typescript
await stream.fetchVideo("0273f24a-79d1-d0fe-97ca-b0e36bed31es", { url: "https://example.com/file.mp4" })
```

#### Source

[src/index.ts:359](https://github.com/dan-online/bunnycdn-stream/blob/d70c6fd/src/index.ts#L359)

***

### generateTUSHash()

> `private` **generateTUSHash**(`videoId`, `expirationTime`): `string`

#### Parameters

• **videoId**: `string`

• **expirationTime**: `number`

#### Returns

`string`

#### Source

[src/index.ts:595](https://github.com/dan-online/bunnycdn-stream/blob/d70c6fd/src/index.ts#L595)

***

### getCollection()

> **getCollection**(`collectionId`): `Promise`\<[`BunnyCdnStreamCollection`](../namespaces/BunnyCdnStream/interfaces/BunnyCdnStreamCollection.md)\>

Retrieve info about a collection from BunnyCdn

#### Parameters

• **collectionId**: `string`

The collection ID

#### Returns

`Promise`\<[`BunnyCdnStreamCollection`](../namespaces/BunnyCdnStream/interfaces/BunnyCdnStreamCollection.md)\>

A [BunnyCdnStreamCollection](../namespaces/BunnyCdnStream/interfaces/BunnyCdnStreamCollection.md) instance.

#### Example

```typescript
await stream.getCollection("0273f24a-79d1-d0fe-97ca-b0e36bed31es")
```

#### Source

[src/index.ts:434](https://github.com/dan-online/bunnycdn-stream/blob/d70c6fd/src/index.ts#L434)

***

### getOptions()

> `private` **getOptions**(): `AxiosRequestConfig`\<`any`\> & `object`

#### Returns

`AxiosRequestConfig`\<`any`\> & `object`

#### Source

[src/index.ts:626](https://github.com/dan-online/bunnycdn-stream/blob/d70c6fd/src/index.ts#L626)

***

### getVideo()

> **getVideo**(`videoId`): `Promise`\<[`BunnyCdnStreamVideo`](BunnyCdnStreamVideo.md)\>

Retrieve a video from BunnyCdn

#### Parameters

• **videoId**: `string`

The video ID

#### Returns

`Promise`\<[`BunnyCdnStreamVideo`](BunnyCdnStreamVideo.md)\>

A [VideoResponse](../namespaces/BunnyCdnStream/interfaces/VideoResponse.md) instance.

#### Example

```typescript
await stream.getVideo("0273f24a-79d1-d0fe-97ca-b0e36bed31es")
```

#### Source

[src/index.ts:40](https://github.com/dan-online/bunnycdn-stream/blob/d70c6fd/src/index.ts#L40)

***

### getVideoHeatmap()

> **getVideoHeatmap**(`videoId`): `Promise`\<[`VideoHeatmapResponse`](../namespaces/BunnyCdnStream/interfaces/VideoHeatmapResponse.md)\>

Get video statistics

#### Parameters

• **videoId**: `string`

The video id to get heatmap info from

#### Returns

`Promise`\<[`VideoHeatmapResponse`](../namespaces/BunnyCdnStream/interfaces/VideoHeatmapResponse.md)\>

A [VideoHeatmapResponse](../namespaces/BunnyCdnStream/interfaces/VideoHeatmapResponse.md) instance.

#### Example

```typescript
await stream.getVideoHeatmap("0273f24a-79d1-d0fe-97ca-b0e36bed31es")
```

#### Source

[src/index.ts:183](https://github.com/dan-online/bunnycdn-stream/blob/d70c6fd/src/index.ts#L183)

***

### getVideoStatistics()

> **getVideoStatistics**(`videoId`, `data`): `Promise`\<[`VideoStatisticsResponse`](../namespaces/BunnyCdnStream/interfaces/VideoStatisticsResponse.md)\>

Get video statistics

#### Parameters

• **videoId**: `string`

• **data**= `{}`

The data to fetch video statistics with

• **data.dateFrom?**: `string`

• **data.dateTo?**: `string`

• **data.hourly?**: `boolean`

#### Returns

`Promise`\<[`VideoStatisticsResponse`](../namespaces/BunnyCdnStream/interfaces/VideoStatisticsResponse.md)\>

A [VideoStatisticsResponse](../namespaces/BunnyCdnStream/interfaces/VideoStatisticsResponse.md) instance.

#### Example

```typescript
await stream.getVideoStatistics("0273f24a-79d1-d0fe-97ca-b0e36bed31es")
```

#### Source

[src/index.ts:200](https://github.com/dan-online/bunnycdn-stream/blob/d70c6fd/src/index.ts#L200)

***

### listAllCollections()

> **listAllCollections**(`data`, `stop`?): `Promise`\<[`BunnyCdnStreamCollection`](../namespaces/BunnyCdnStream/interfaces/BunnyCdnStreamCollection.md)[]\>

List all collections with an optional callback between each page

#### Parameters

• **data**= `{}`

The options to list collections with

• **data.itemsPerPage?**: `number`

• **data.orderBy?**: `string`

• **data.search?**: `string`

• **stop?**

The callback that if returns ``true`` stops the iteration

#### Returns

`Promise`\<[`BunnyCdnStreamCollection`](../namespaces/BunnyCdnStream/interfaces/BunnyCdnStreamCollection.md)[]\>

An array of [BunnyCdnStreamCollection](../namespaces/BunnyCdnStream/interfaces/BunnyCdnStreamCollection.md) instances.

#### Example

```typescript
await stream.listAllCollections()
```

#### Source

[src/index.ts:475](https://github.com/dan-online/bunnycdn-stream/blob/d70c6fd/src/index.ts#L475)

***

### listAllVideos()

> **listAllVideos**(`data`, `stop`?): `Promise`\<[`BunnyCdnStreamVideo`](BunnyCdnStreamVideo.md)[]\>

List all videos with an optional callback between each page

#### Parameters

• **data**= `{}`

The options to list videos with

• **data.collection?**: `string`

• **data.itemsPerPage?**: `number`

• **data.orderBy?**: `string`

• **data.search?**: `string`

• **stop?**

The callback that if returns ``true`` stops the iteration

#### Returns

`Promise`\<[`BunnyCdnStreamVideo`](BunnyCdnStreamVideo.md)[]\>

An array of [VideoStatisticsResponse](../namespaces/BunnyCdnStream/interfaces/VideoStatisticsResponse.md) instances.

#### Example

```typescript
await stream.listAllVideos()
```

#### Source

[src/index.ts:276](https://github.com/dan-online/bunnycdn-stream/blob/d70c6fd/src/index.ts#L276)

***

### listCollections()

> **listCollections**(`data`): `Promise`\<[`ListCollectionsResponse`](../namespaces/BunnyCdnStream/interfaces/ListCollectionsResponse.md)\>

List collections

#### Parameters

• **data**= `{}`

The options to list collections with

• **data.itemsPerPage?**: `number`

• **data.orderBy?**: `string`

• **data.page?**: `number`

• **data.search?**: `string`

#### Returns

`Promise`\<[`ListCollectionsResponse`](../namespaces/BunnyCdnStream/interfaces/ListCollectionsResponse.md)\>

a [ListCollectionsResponse](../namespaces/BunnyCdnStream/interfaces/ListCollectionsResponse.md) instances.

#### Example

```typescript
await stream.listCollections({ page: 2, search: "Y collections", itemsPerPage: 100, orderBy: 'date' })
```

#### Source

[src/index.ts:449](https://github.com/dan-online/bunnycdn-stream/blob/d70c6fd/src/index.ts#L449)

***

### listVideos()

> **listVideos**(`data`): `Promise`\<`object`\>

List videos

#### Parameters

• **data**= `{}`

The options to list videos with

• **data.collection?**: `string`

• **data.itemsPerPage?**: `number`

• **data.orderBy?**: `string`

• **data.page?**: `number`

• **data.search?**: `string`

#### Returns

`Promise`\<`object`\>

An array of [VideoStatisticsResponse](../namespaces/BunnyCdnStream/interfaces/VideoStatisticsResponse.md) instances.

##### currentPage

> **currentPage**: `number`

##### items

> **items**: [`BunnyCdnStreamVideo`](BunnyCdnStreamVideo.md)[]

##### itemsPerPage

> **itemsPerPage**: `number`

##### totalItems

> **totalItems**: `number`

#### Example

```typescript
await stream.listVideos({ page: 2, search: "The best title", itemsPerPage: 10 })
```

#### Source

[src/index.ts:245](https://github.com/dan-online/bunnycdn-stream/blob/d70c6fd/src/index.ts#L245)

***

### reencodeVideo()

> **reencodeVideo**(`videoId`): `Promise`\<[`BunnyCdnStreamVideo`](BunnyCdnStreamVideo.md)\>

Force re-encode a video

NOTE: This will not work if keepOriginal is set to false

#### Parameters

• **videoId**: `string`

The video ID

#### Returns

`Promise`\<[`BunnyCdnStreamVideo`](BunnyCdnStreamVideo.md)\>

A [VideoResponse](../namespaces/BunnyCdnStream/interfaces/VideoResponse.md) instance.

#### Example

```typescript
await stream.reencodeVideo("0273f24a-79d1-d0fe-97ca-b0e36bed31es")
```

#### Source

[src/index.ts:226](https://github.com/dan-online/bunnycdn-stream/blob/d70c6fd/src/index.ts#L226)

***

### request()

> `private` **request**\<`ResponseType`\>(`options`, `name`): `Promise`\<`ResponseType`\>

#### Type parameters

• **ResponseType** *extends* `Record`\<`string`, `any`\>

#### Parameters

• **options**: `AxiosRequestConfig`\<`any`\>

• **name**: `string`

#### Returns

`Promise`\<`ResponseType`\>

#### Source

[src/index.ts:602](https://github.com/dan-online/bunnycdn-stream/blob/d70c6fd/src/index.ts#L602)

***

### setThumbnail()

> **setThumbnail**(`videoId`, `thumbnail`, `overrideContentType`?): `Promise`\<[`SetThumbnailVideoResponse`](../namespaces/BunnyCdnStream/interfaces/SetThumbnailVideoResponse.md)\>

Set the thumbnail

NOTE: The file type is automatically detected from the buffer, however if it fails, it will default to ``image/jpeg``

#### Parameters

• **videoId**: `string`

The video ID

• **thumbnail**: `string` \| `ReadStream` \| `Buffer`

A buffer/stream/url of the thumbnail

• **overrideContentType?**: `string`

The content type to override and skip the automatic detection

#### Returns

`Promise`\<[`SetThumbnailVideoResponse`](../namespaces/BunnyCdnStream/interfaces/SetThumbnailVideoResponse.md)\>

A [SetThumbnailVideoResponse](../namespaces/BunnyCdnStream/interfaces/SetThumbnailVideoResponse.md) instance.

#### Example

```typescript
await stream.setThumbnail("0273f24a-79d1-d0fe-97ca-b0e36bed31es", readFileSync("thumbnail.jpg"))
```

#### Source

[src/index.ts:327](https://github.com/dan-online/bunnycdn-stream/blob/d70c6fd/src/index.ts#L327)

***

### updateCollection()

> **updateCollection**(`collectionId`, `data`): `Promise`\<[`UpdateCollectionResponse`](../namespaces/BunnyCdnStream/interfaces/UpdateCollectionResponse.md)\>

Update info of a collection

#### Parameters

• **collectionId**: `string`

The collection ID

• **data**

• **data.name**: `string`

#### Returns

`Promise`\<[`UpdateCollectionResponse`](../namespaces/BunnyCdnStream/interfaces/UpdateCollectionResponse.md)\>

A [UpdateCollectionResponse](../namespaces/BunnyCdnStream/interfaces/UpdateCollectionResponse.md) instance.

#### Example

```typescript
await stream.updateCollection("0273f24a-79d1-d0fe-97ca-b0e36bed31es", { name: 'New Collection'})
```

#### Source

[src/index.ts:517](https://github.com/dan-online/bunnycdn-stream/blob/d70c6fd/src/index.ts#L517)

***

### updateVideo()

> **updateVideo**(`videoId`, `data`): `Promise`\<[`UpdateVideoResponse`](../namespaces/BunnyCdnStream/interfaces/UpdateVideoResponse.md)\>

Update video information

#### Parameters

• **videoId**: `string`

The video ID

• **data**= `{}`

The data to update

• **data.chapters?**: `object`[]

• **data.collectionId?**: `string`

• **data.metaTags?**: `object`[]

• **data.moments?**: `object`[]

• **data.title?**: `string`

#### Returns

`Promise`\<[`UpdateVideoResponse`](../namespaces/BunnyCdnStream/interfaces/UpdateVideoResponse.md)\>

A [VideoResponse](../namespaces/BunnyCdnStream/interfaces/VideoResponse.md) instance.

#### Example

```typescript
await stream.updateVideo("0273f24a-79d1-d0fe-97ca-b0e36bed31es", { title: "New title" })
```

#### Source

[src/index.ts:58](https://github.com/dan-online/bunnycdn-stream/blob/d70c6fd/src/index.ts#L58)

***

### uploadVideo()

> **uploadVideo**(`file`, `videoId`, `data`?): `Promise`\<[`UploadVideoResponse`](../namespaces/BunnyCdnStream/interfaces/UploadVideoResponse.md)\>

Upload video, this does not create the video and requires a created video

#### Parameters

• **file**: `ReadStream`

The video file to upload as a readable stream

• **videoId**: `string`

The video id to upload to of a created video

• **data?**

Optional paramaters such as enabledResolutions

• **data.enabledResolutions?**: `string`

#### Returns

`Promise`\<[`UploadVideoResponse`](../namespaces/BunnyCdnStream/interfaces/UploadVideoResponse.md)\>

A [UploadVideoResponse](../namespaces/BunnyCdnStream/interfaces/UploadVideoResponse.md) instance.

#### Example

```typescript
await stream.uploadVideo(createReadStream("./file.mp4"), "0273f24a-79d1-d0fe-97ca-b0e36bed31es")
```

#### Source

[src/index.ts:145](https://github.com/dan-online/bunnycdn-stream/blob/d70c6fd/src/index.ts#L145)
