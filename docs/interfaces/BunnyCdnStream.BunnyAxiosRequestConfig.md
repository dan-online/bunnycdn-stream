[bunnycdn-stream](../README.md) / [Exports](../modules.md) / [BunnyCdnStream](../modules/BunnyCdnStream.md) / BunnyAxiosRequestConfig

# Interface: BunnyAxiosRequestConfig

[BunnyCdnStream](../modules/BunnyCdnStream.md).BunnyAxiosRequestConfig

## Hierarchy

- `AxiosRequestConfig`

  ↳ **`BunnyAxiosRequestConfig`**

## Table of contents

### Properties

- [adapter](BunnyCdnStream.BunnyAxiosRequestConfig.md#adapter)
- [auth](BunnyCdnStream.BunnyAxiosRequestConfig.md#auth)
- [baseURL](BunnyCdnStream.BunnyAxiosRequestConfig.md#baseurl)
- [beforeRedirect](BunnyCdnStream.BunnyAxiosRequestConfig.md#beforeredirect)
- [cancelToken](BunnyCdnStream.BunnyAxiosRequestConfig.md#canceltoken)
- [data](BunnyCdnStream.BunnyAxiosRequestConfig.md#data)
- [decompress](BunnyCdnStream.BunnyAxiosRequestConfig.md#decompress)
- [env](BunnyCdnStream.BunnyAxiosRequestConfig.md#env)
- [formSerializer](BunnyCdnStream.BunnyAxiosRequestConfig.md#formserializer)
- [headers](BunnyCdnStream.BunnyAxiosRequestConfig.md#headers)
- [httpAgent](BunnyCdnStream.BunnyAxiosRequestConfig.md#httpagent)
- [httpsAgent](BunnyCdnStream.BunnyAxiosRequestConfig.md#httpsagent)
- [insecureHTTPParser](BunnyCdnStream.BunnyAxiosRequestConfig.md#insecurehttpparser)
- [maxBodyLength](BunnyCdnStream.BunnyAxiosRequestConfig.md#maxbodylength)
- [maxContentLength](BunnyCdnStream.BunnyAxiosRequestConfig.md#maxcontentlength)
- [maxRate](BunnyCdnStream.BunnyAxiosRequestConfig.md#maxrate)
- [maxRedirects](BunnyCdnStream.BunnyAxiosRequestConfig.md#maxredirects)
- [method](BunnyCdnStream.BunnyAxiosRequestConfig.md#method)
- [onDownloadProgress](BunnyCdnStream.BunnyAxiosRequestConfig.md#ondownloadprogress)
- [onUploadProgress](BunnyCdnStream.BunnyAxiosRequestConfig.md#onuploadprogress)
- [params](BunnyCdnStream.BunnyAxiosRequestConfig.md#params)
- [paramsSerializer](BunnyCdnStream.BunnyAxiosRequestConfig.md#paramsserializer)
- [proxy](BunnyCdnStream.BunnyAxiosRequestConfig.md#proxy)
- [responseEncoding](BunnyCdnStream.BunnyAxiosRequestConfig.md#responseencoding)
- [responseType](BunnyCdnStream.BunnyAxiosRequestConfig.md#responsetype)
- [signal](BunnyCdnStream.BunnyAxiosRequestConfig.md#signal)
- [socketPath](BunnyCdnStream.BunnyAxiosRequestConfig.md#socketpath)
- [timeout](BunnyCdnStream.BunnyAxiosRequestConfig.md#timeout)
- [timeoutErrorMessage](BunnyCdnStream.BunnyAxiosRequestConfig.md#timeouterrormessage)
- [transformRequest](BunnyCdnStream.BunnyAxiosRequestConfig.md#transformrequest)
- [transformResponse](BunnyCdnStream.BunnyAxiosRequestConfig.md#transformresponse)
- [transitional](BunnyCdnStream.BunnyAxiosRequestConfig.md#transitional)
- [url](BunnyCdnStream.BunnyAxiosRequestConfig.md#url)
- [validateStatus](BunnyCdnStream.BunnyAxiosRequestConfig.md#validatestatus)
- [withCredentials](BunnyCdnStream.BunnyAxiosRequestConfig.md#withcredentials)
- [xsrfCookieName](BunnyCdnStream.BunnyAxiosRequestConfig.md#xsrfcookiename)
- [xsrfHeaderName](BunnyCdnStream.BunnyAxiosRequestConfig.md#xsrfheadername)

## Properties

### adapter

• `Optional` **adapter**: `AxiosAdapterConfig` \| `AxiosAdapterConfig`[]

#### Inherited from

AxiosRequestConfig.adapter

#### Defined in

node_modules/axios/index.d.ts:319

___

### auth

• `Optional` **auth**: `AxiosBasicCredentials`

#### Inherited from

AxiosRequestConfig.auth

#### Defined in

node_modules/axios/index.d.ts:320

___

### baseURL

• `Optional` **baseURL**: `string`

#### Inherited from

AxiosRequestConfig.baseURL

#### Defined in

node_modules/axios/index.d.ts:309

___

### beforeRedirect

• `Optional` **beforeRedirect**: (`options`: `Record`<`string`, `any`\>, `responseDetails`: { `headers`: `Record`<`string`, `string`\>  }) => `void`

#### Type declaration

▸ (`options`, `responseDetails`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Record`<`string`, `any`\> |
| `responseDetails` | `Object` |
| `responseDetails.headers` | `Record`<`string`, `string`\> |

##### Returns

`void`

#### Inherited from

AxiosRequestConfig.beforeRedirect

#### Defined in

node_modules/axios/index.d.ts:332

___

### cancelToken

• `Optional` **cancelToken**: `CancelToken`

#### Inherited from

AxiosRequestConfig.cancelToken

#### Defined in

node_modules/axios/index.d.ts:337

___

### data

• `Optional` **data**: `any`

#### Inherited from

AxiosRequestConfig.data

#### Defined in

node_modules/axios/index.d.ts:315

___

### decompress

• `Optional` **decompress**: `boolean`

#### Inherited from

AxiosRequestConfig.decompress

#### Defined in

node_modules/axios/index.d.ts:338

___

### env

• `Optional` **env**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `FormData?` | (...`args`: `any`[]) => `object` |

#### Inherited from

AxiosRequestConfig.env

#### Defined in

node_modules/axios/index.d.ts:342

___

### formSerializer

• `Optional` **formSerializer**: `FormSerializerOptions`

#### Inherited from

AxiosRequestConfig.formSerializer

#### Defined in

node_modules/axios/index.d.ts:345

___

### headers

• **headers**: `AxiosRequestHeaders`

#### Overrides

AxiosRequestConfig.headers

#### Defined in

[src/index.ts:794](https://github.com/dan-online/bunnycdn-stream/blob/72d3ec1/src/index.ts#L794)

___

### httpAgent

• `Optional` **httpAgent**: `any`

#### Inherited from

AxiosRequestConfig.httpAgent

#### Defined in

node_modules/axios/index.d.ts:334

___

### httpsAgent

• `Optional` **httpsAgent**: `any`

#### Inherited from

AxiosRequestConfig.httpsAgent

#### Defined in

node_modules/axios/index.d.ts:335

___

### insecureHTTPParser

• `Optional` **insecureHTTPParser**: `boolean`

#### Inherited from

AxiosRequestConfig.insecureHTTPParser

#### Defined in

node_modules/axios/index.d.ts:341

___

### maxBodyLength

• `Optional` **maxBodyLength**: `number`

#### Inherited from

AxiosRequestConfig.maxBodyLength

#### Defined in

node_modules/axios/index.d.ts:329

___

### maxContentLength

• `Optional` **maxContentLength**: `number`

#### Inherited from

AxiosRequestConfig.maxContentLength

#### Defined in

node_modules/axios/index.d.ts:327

___

### maxRate

• `Optional` **maxRate**: `number` \| [`number`, `number`]

#### Inherited from

AxiosRequestConfig.maxRate

#### Defined in

node_modules/axios/index.d.ts:331

___

### maxRedirects

• `Optional` **maxRedirects**: `number`

#### Inherited from

AxiosRequestConfig.maxRedirects

#### Defined in

node_modules/axios/index.d.ts:330

___

### method

• `Optional` **method**: `string`

#### Inherited from

AxiosRequestConfig.method

#### Defined in

node_modules/axios/index.d.ts:308

___

### onDownloadProgress

• `Optional` **onDownloadProgress**: (`progressEvent`: `AxiosProgressEvent`) => `void`

#### Type declaration

▸ (`progressEvent`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `progressEvent` | `AxiosProgressEvent` |

##### Returns

`void`

#### Inherited from

AxiosRequestConfig.onDownloadProgress

#### Defined in

node_modules/axios/index.d.ts:326

___

### onUploadProgress

• `Optional` **onUploadProgress**: (`progressEvent`: `AxiosProgressEvent`) => `void`

#### Type declaration

▸ (`progressEvent`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `progressEvent` | `AxiosProgressEvent` |

##### Returns

`void`

#### Inherited from

AxiosRequestConfig.onUploadProgress

#### Defined in

node_modules/axios/index.d.ts:325

___

### params

• `Optional` **params**: `any`

#### Inherited from

AxiosRequestConfig.params

#### Defined in

node_modules/axios/index.d.ts:313

___

### paramsSerializer

• `Optional` **paramsSerializer**: `ParamsSerializerOptions`

#### Inherited from

AxiosRequestConfig.paramsSerializer

#### Defined in

node_modules/axios/index.d.ts:314

___

### proxy

• `Optional` **proxy**: ``false`` \| `AxiosProxyConfig`

#### Inherited from

AxiosRequestConfig.proxy

#### Defined in

node_modules/axios/index.d.ts:336

___

### responseEncoding

• `Optional` **responseEncoding**: `string`

#### Inherited from

AxiosRequestConfig.responseEncoding

#### Defined in

node_modules/axios/index.d.ts:322

___

### responseType

• `Optional` **responseType**: `ResponseType`

#### Inherited from

AxiosRequestConfig.responseType

#### Defined in

node_modules/axios/index.d.ts:321

___

### signal

• `Optional` **signal**: `GenericAbortSignal`

#### Inherited from

AxiosRequestConfig.signal

#### Defined in

node_modules/axios/index.d.ts:340

___

### socketPath

• `Optional` **socketPath**: ``null`` \| `string`

#### Inherited from

AxiosRequestConfig.socketPath

#### Defined in

node_modules/axios/index.d.ts:333

___

### timeout

• `Optional` **timeout**: `number`

#### Inherited from

AxiosRequestConfig.timeout

#### Defined in

node_modules/axios/index.d.ts:316

___

### timeoutErrorMessage

• `Optional` **timeoutErrorMessage**: `string`

#### Inherited from

AxiosRequestConfig.timeoutErrorMessage

#### Defined in

node_modules/axios/index.d.ts:317

___

### transformRequest

• `Optional` **transformRequest**: `AxiosRequestTransformer` \| `AxiosRequestTransformer`[]

#### Inherited from

AxiosRequestConfig.transformRequest

#### Defined in

node_modules/axios/index.d.ts:310

___

### transformResponse

• `Optional` **transformResponse**: `AxiosResponseTransformer` \| `AxiosResponseTransformer`[]

#### Inherited from

AxiosRequestConfig.transformResponse

#### Defined in

node_modules/axios/index.d.ts:311

___

### transitional

• `Optional` **transitional**: `TransitionalOptions`

#### Inherited from

AxiosRequestConfig.transitional

#### Defined in

node_modules/axios/index.d.ts:339

___

### url

• `Optional` **url**: `string`

#### Inherited from

AxiosRequestConfig.url

#### Defined in

node_modules/axios/index.d.ts:307

___

### validateStatus

• `Optional` **validateStatus**: ``null`` \| (`status`: `number`) => `boolean`

#### Inherited from

AxiosRequestConfig.validateStatus

#### Defined in

node_modules/axios/index.d.ts:328

___

### withCredentials

• `Optional` **withCredentials**: `boolean`

#### Inherited from

AxiosRequestConfig.withCredentials

#### Defined in

node_modules/axios/index.d.ts:318

___

### xsrfCookieName

• `Optional` **xsrfCookieName**: `string`

#### Inherited from

AxiosRequestConfig.xsrfCookieName

#### Defined in

node_modules/axios/index.d.ts:323

___

### xsrfHeaderName

• `Optional` **xsrfHeaderName**: `string`

#### Inherited from

AxiosRequestConfig.xsrfHeaderName

#### Defined in

node_modules/axios/index.d.ts:324
