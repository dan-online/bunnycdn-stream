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
- [cancelToken](BunnyCdnStream.BunnyAxiosRequestConfig.md#canceltoken)
- [data](BunnyCdnStream.BunnyAxiosRequestConfig.md#data)
- [decompress](BunnyCdnStream.BunnyAxiosRequestConfig.md#decompress)
- [env](BunnyCdnStream.BunnyAxiosRequestConfig.md#env)
- [headers](BunnyCdnStream.BunnyAxiosRequestConfig.md#headers)
- [httpAgent](BunnyCdnStream.BunnyAxiosRequestConfig.md#httpagent)
- [httpsAgent](BunnyCdnStream.BunnyAxiosRequestConfig.md#httpsagent)
- [insecureHTTPParser](BunnyCdnStream.BunnyAxiosRequestConfig.md#insecurehttpparser)
- [maxBodyLength](BunnyCdnStream.BunnyAxiosRequestConfig.md#maxbodylength)
- [maxContentLength](BunnyCdnStream.BunnyAxiosRequestConfig.md#maxcontentlength)
- [maxRedirects](BunnyCdnStream.BunnyAxiosRequestConfig.md#maxredirects)
- [method](BunnyCdnStream.BunnyAxiosRequestConfig.md#method)
- [params](BunnyCdnStream.BunnyAxiosRequestConfig.md#params)
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

### Methods

- [beforeRedirect](BunnyCdnStream.BunnyAxiosRequestConfig.md#beforeredirect)
- [onDownloadProgress](BunnyCdnStream.BunnyAxiosRequestConfig.md#ondownloadprogress)
- [onUploadProgress](BunnyCdnStream.BunnyAxiosRequestConfig.md#onuploadprogress)
- [paramsSerializer](BunnyCdnStream.BunnyAxiosRequestConfig.md#paramsserializer)

## Properties

### adapter

• `Optional` **adapter**: `AxiosAdapter`

#### Inherited from

AxiosRequestConfig.adapter

#### Defined in

node_modules/axios/index.d.ts:88

___

### auth

• `Optional` **auth**: `AxiosBasicCredentials`

#### Inherited from

AxiosRequestConfig.auth

#### Defined in

node_modules/axios/index.d.ts:89

___

### baseURL

• `Optional` **baseURL**: `string`

#### Inherited from

AxiosRequestConfig.baseURL

#### Defined in

node_modules/axios/index.d.ts:78

___

### cancelToken

• `Optional` **cancelToken**: `CancelToken`

#### Inherited from

AxiosRequestConfig.cancelToken

#### Defined in

node_modules/axios/index.d.ts:105

___

### data

• `Optional` **data**: `any`

#### Inherited from

AxiosRequestConfig.data

#### Defined in

node_modules/axios/index.d.ts:84

___

### decompress

• `Optional` **decompress**: `boolean`

#### Inherited from

AxiosRequestConfig.decompress

#### Defined in

node_modules/axios/index.d.ts:106

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

node_modules/axios/index.d.ts:110

___

### headers

• **headers**: `AxiosRequestHeaders`

#### Overrides

AxiosRequestConfig.headers

#### Defined in

[src/index.ts:437](https://github.com/dan-online/bunnycdn-stream/blob/0d47ebd/src/index.ts#L437)

___

### httpAgent

• `Optional` **httpAgent**: `any`

#### Inherited from

AxiosRequestConfig.httpAgent

#### Defined in

node_modules/axios/index.d.ts:102

___

### httpsAgent

• `Optional` **httpsAgent**: `any`

#### Inherited from

AxiosRequestConfig.httpsAgent

#### Defined in

node_modules/axios/index.d.ts:103

___

### insecureHTTPParser

• `Optional` **insecureHTTPParser**: `boolean`

#### Inherited from

AxiosRequestConfig.insecureHTTPParser

#### Defined in

node_modules/axios/index.d.ts:109

___

### maxBodyLength

• `Optional` **maxBodyLength**: `number`

#### Inherited from

AxiosRequestConfig.maxBodyLength

#### Defined in

node_modules/axios/index.d.ts:98

___

### maxContentLength

• `Optional` **maxContentLength**: `number`

#### Inherited from

AxiosRequestConfig.maxContentLength

#### Defined in

node_modules/axios/index.d.ts:96

___

### maxRedirects

• `Optional` **maxRedirects**: `number`

#### Inherited from

AxiosRequestConfig.maxRedirects

#### Defined in

node_modules/axios/index.d.ts:99

___

### method

• `Optional` **method**: `string`

#### Inherited from

AxiosRequestConfig.method

#### Defined in

node_modules/axios/index.d.ts:77

___

### params

• `Optional` **params**: `any`

#### Inherited from

AxiosRequestConfig.params

#### Defined in

node_modules/axios/index.d.ts:82

___

### proxy

• `Optional` **proxy**: ``false`` \| `AxiosProxyConfig`

#### Inherited from

AxiosRequestConfig.proxy

#### Defined in

node_modules/axios/index.d.ts:104

___

### responseEncoding

• `Optional` **responseEncoding**: `string`

#### Inherited from

AxiosRequestConfig.responseEncoding

#### Defined in

node_modules/axios/index.d.ts:91

___

### responseType

• `Optional` **responseType**: `ResponseType`

#### Inherited from

AxiosRequestConfig.responseType

#### Defined in

node_modules/axios/index.d.ts:90

___

### signal

• `Optional` **signal**: `AbortSignal`

#### Inherited from

AxiosRequestConfig.signal

#### Defined in

node_modules/axios/index.d.ts:108

___

### socketPath

• `Optional` **socketPath**: ``null`` \| `string`

#### Inherited from

AxiosRequestConfig.socketPath

#### Defined in

node_modules/axios/index.d.ts:101

___

### timeout

• `Optional` **timeout**: `number`

#### Inherited from

AxiosRequestConfig.timeout

#### Defined in

node_modules/axios/index.d.ts:85

___

### timeoutErrorMessage

• `Optional` **timeoutErrorMessage**: `string`

#### Inherited from

AxiosRequestConfig.timeoutErrorMessage

#### Defined in

node_modules/axios/index.d.ts:86

___

### transformRequest

• `Optional` **transformRequest**: `AxiosRequestTransformer` \| `AxiosRequestTransformer`[]

#### Inherited from

AxiosRequestConfig.transformRequest

#### Defined in

node_modules/axios/index.d.ts:79

___

### transformResponse

• `Optional` **transformResponse**: `AxiosResponseTransformer` \| `AxiosResponseTransformer`[]

#### Inherited from

AxiosRequestConfig.transformResponse

#### Defined in

node_modules/axios/index.d.ts:80

___

### transitional

• `Optional` **transitional**: `TransitionalOptions`

#### Inherited from

AxiosRequestConfig.transitional

#### Defined in

node_modules/axios/index.d.ts:107

___

### url

• `Optional` **url**: `string`

#### Inherited from

AxiosRequestConfig.url

#### Defined in

node_modules/axios/index.d.ts:76

___

### validateStatus

• `Optional` **validateStatus**: ``null`` \| (`status`: `number`) => `boolean`

#### Inherited from

AxiosRequestConfig.validateStatus

#### Defined in

node_modules/axios/index.d.ts:97

___

### withCredentials

• `Optional` **withCredentials**: `boolean`

#### Inherited from

AxiosRequestConfig.withCredentials

#### Defined in

node_modules/axios/index.d.ts:87

___

### xsrfCookieName

• `Optional` **xsrfCookieName**: `string`

#### Inherited from

AxiosRequestConfig.xsrfCookieName

#### Defined in

node_modules/axios/index.d.ts:92

___

### xsrfHeaderName

• `Optional` **xsrfHeaderName**: `string`

#### Inherited from

AxiosRequestConfig.xsrfHeaderName

#### Defined in

node_modules/axios/index.d.ts:93

## Methods

### beforeRedirect

▸ `Optional` **beforeRedirect**(`options`, `responseDetails`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Record`<`string`, `any`\> |
| `responseDetails` | `Object` |
| `responseDetails.headers` | `Record`<`string`, `string`\> |

#### Returns

`void`

#### Inherited from

AxiosRequestConfig.beforeRedirect

#### Defined in

node_modules/axios/index.d.ts:100

___

### onDownloadProgress

▸ `Optional` **onDownloadProgress**(`progressEvent`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `progressEvent` | `any` |

#### Returns

`void`

#### Inherited from

AxiosRequestConfig.onDownloadProgress

#### Defined in

node_modules/axios/index.d.ts:95

___

### onUploadProgress

▸ `Optional` **onUploadProgress**(`progressEvent`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `progressEvent` | `any` |

#### Returns

`void`

#### Inherited from

AxiosRequestConfig.onUploadProgress

#### Defined in

node_modules/axios/index.d.ts:94

___

### paramsSerializer

▸ `Optional` **paramsSerializer**(`params`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `any` |

#### Returns

`string`

#### Inherited from

AxiosRequestConfig.paramsSerializer

#### Defined in

node_modules/axios/index.d.ts:83
