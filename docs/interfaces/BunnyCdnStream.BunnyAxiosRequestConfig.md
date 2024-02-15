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
- [family](BunnyCdnStream.BunnyAxiosRequestConfig.md#family)
- [formSerializer](BunnyCdnStream.BunnyAxiosRequestConfig.md#formserializer)
- [headers](BunnyCdnStream.BunnyAxiosRequestConfig.md#headers)
- [httpAgent](BunnyCdnStream.BunnyAxiosRequestConfig.md#httpagent)
- [httpsAgent](BunnyCdnStream.BunnyAxiosRequestConfig.md#httpsagent)
- [insecureHTTPParser](BunnyCdnStream.BunnyAxiosRequestConfig.md#insecurehttpparser)
- [lookup](BunnyCdnStream.BunnyAxiosRequestConfig.md#lookup)
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
- [transport](BunnyCdnStream.BunnyAxiosRequestConfig.md#transport)
- [url](BunnyCdnStream.BunnyAxiosRequestConfig.md#url)
- [validateStatus](BunnyCdnStream.BunnyAxiosRequestConfig.md#validatestatus)
- [withCredentials](BunnyCdnStream.BunnyAxiosRequestConfig.md#withcredentials)
- [withXSRFToken](BunnyCdnStream.BunnyAxiosRequestConfig.md#withxsrftoken)
- [xsrfCookieName](BunnyCdnStream.BunnyAxiosRequestConfig.md#xsrfcookiename)
- [xsrfHeaderName](BunnyCdnStream.BunnyAxiosRequestConfig.md#xsrfheadername)

## Properties

### adapter

• `Optional` **adapter**: `AxiosAdapterConfig` \| `AxiosAdapterConfig`[]

#### Inherited from

AxiosRequestConfig.adapter

#### Defined in

node_modules/axios/index.d.cts:386

___

### auth

• `Optional` **auth**: `AxiosBasicCredentials`

#### Inherited from

AxiosRequestConfig.auth

#### Defined in

node_modules/axios/index.d.cts:387

___

### baseURL

• `Optional` **baseURL**: `string`

#### Inherited from

AxiosRequestConfig.baseURL

#### Defined in

node_modules/axios/index.d.cts:376

___

### beforeRedirect

• `Optional` **beforeRedirect**: (`options`: `Record`<`string`, `any`\>, `responseDetails`: { `headers`: `Record`<`string`, `string`\> ; `statusCode`: `HttpStatusCode`  }) => `void`

#### Type declaration

▸ (`options`, `responseDetails`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Record`<`string`, `any`\> |
| `responseDetails` | `Object` |
| `responseDetails.headers` | `Record`<`string`, `string`\> |
| `responseDetails.statusCode` | `HttpStatusCode` |

##### Returns

`void`

#### Inherited from

AxiosRequestConfig.beforeRedirect

#### Defined in

node_modules/axios/index.d.cts:399

___

### cancelToken

• `Optional` **cancelToken**: `CancelToken`

#### Inherited from

AxiosRequestConfig.cancelToken

#### Defined in

node_modules/axios/index.d.cts:405

___

### data

• `Optional` **data**: `any`

#### Inherited from

AxiosRequestConfig.data

#### Defined in

node_modules/axios/index.d.cts:382

___

### decompress

• `Optional` **decompress**: `boolean`

#### Inherited from

AxiosRequestConfig.decompress

#### Defined in

node_modules/axios/index.d.cts:406

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

node_modules/axios/index.d.cts:410

___

### family

• `Optional` **family**: `AddressFamily`

#### Inherited from

AxiosRequestConfig.family

#### Defined in

node_modules/axios/index.d.cts:414

___

### formSerializer

• `Optional` **formSerializer**: `FormSerializerOptions`

#### Inherited from

AxiosRequestConfig.formSerializer

#### Defined in

node_modules/axios/index.d.cts:413

___

### headers

• **headers**: `AxiosRequestHeaders`

#### Overrides

AxiosRequestConfig.headers

#### Defined in

[src/index.ts:792](https://github.com/dan-online/bunnycdn-stream/blob/2d76aff/src/index.ts#L792)

___

### httpAgent

• `Optional` **httpAgent**: `any`

#### Inherited from

AxiosRequestConfig.httpAgent

#### Defined in

node_modules/axios/index.d.cts:402

___

### httpsAgent

• `Optional` **httpsAgent**: `any`

#### Inherited from

AxiosRequestConfig.httpsAgent

#### Defined in

node_modules/axios/index.d.cts:403

___

### insecureHTTPParser

• `Optional` **insecureHTTPParser**: `boolean`

#### Inherited from

AxiosRequestConfig.insecureHTTPParser

#### Defined in

node_modules/axios/index.d.cts:409

___

### lookup

• `Optional` **lookup**: (`hostname`: `string`, `options`: `object`, `cb`: (`err`: ``null`` \| `Error`, `address`: `LookupAddress` \| `LookupAddress`[], `family?`: `AddressFamily`) => `void`) => `void` \| (`hostname`: `string`, `options`: `object`) => `Promise`<`LookupAddress` \| [address: LookupAddressEntry \| LookupAddressEntry[], family?: AddressFamily]\>

#### Inherited from

AxiosRequestConfig.lookup

#### Defined in

node_modules/axios/index.d.cts:415

___

### maxBodyLength

• `Optional` **maxBodyLength**: `number`

#### Inherited from

AxiosRequestConfig.maxBodyLength

#### Defined in

node_modules/axios/index.d.cts:396

___

### maxContentLength

• `Optional` **maxContentLength**: `number`

#### Inherited from

AxiosRequestConfig.maxContentLength

#### Defined in

node_modules/axios/index.d.cts:394

___

### maxRate

• `Optional` **maxRate**: `number` \| [`number`, `number`]

#### Inherited from

AxiosRequestConfig.maxRate

#### Defined in

node_modules/axios/index.d.cts:398

___

### maxRedirects

• `Optional` **maxRedirects**: `number`

#### Inherited from

AxiosRequestConfig.maxRedirects

#### Defined in

node_modules/axios/index.d.cts:397

___

### method

• `Optional` **method**: `string`

#### Inherited from

AxiosRequestConfig.method

#### Defined in

node_modules/axios/index.d.cts:375

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

node_modules/axios/index.d.cts:393

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

node_modules/axios/index.d.cts:392

___

### params

• `Optional` **params**: `any`

#### Inherited from

AxiosRequestConfig.params

#### Defined in

node_modules/axios/index.d.cts:380

___

### paramsSerializer

• `Optional` **paramsSerializer**: `ParamsSerializerOptions` \| `CustomParamsSerializer`

#### Inherited from

AxiosRequestConfig.paramsSerializer

#### Defined in

node_modules/axios/index.d.cts:381

___

### proxy

• `Optional` **proxy**: ``false`` \| `AxiosProxyConfig`

#### Inherited from

AxiosRequestConfig.proxy

#### Defined in

node_modules/axios/index.d.cts:404

___

### responseEncoding

• `Optional` **responseEncoding**: `string`

#### Inherited from

AxiosRequestConfig.responseEncoding

#### Defined in

node_modules/axios/index.d.cts:389

___

### responseType

• `Optional` **responseType**: `ResponseType`

#### Inherited from

AxiosRequestConfig.responseType

#### Defined in

node_modules/axios/index.d.cts:388

___

### signal

• `Optional` **signal**: `GenericAbortSignal`

#### Inherited from

AxiosRequestConfig.signal

#### Defined in

node_modules/axios/index.d.cts:408

___

### socketPath

• `Optional` **socketPath**: ``null`` \| `string`

#### Inherited from

AxiosRequestConfig.socketPath

#### Defined in

node_modules/axios/index.d.cts:400

___

### timeout

• `Optional` **timeout**: `number`

#### Inherited from

AxiosRequestConfig.timeout

#### Defined in

node_modules/axios/index.d.cts:383

___

### timeoutErrorMessage

• `Optional` **timeoutErrorMessage**: `string`

#### Inherited from

AxiosRequestConfig.timeoutErrorMessage

#### Defined in

node_modules/axios/index.d.cts:384

___

### transformRequest

• `Optional` **transformRequest**: `AxiosRequestTransformer` \| `AxiosRequestTransformer`[]

#### Inherited from

AxiosRequestConfig.transformRequest

#### Defined in

node_modules/axios/index.d.cts:377

___

### transformResponse

• `Optional` **transformResponse**: `AxiosResponseTransformer` \| `AxiosResponseTransformer`[]

#### Inherited from

AxiosRequestConfig.transformResponse

#### Defined in

node_modules/axios/index.d.cts:378

___

### transitional

• `Optional` **transitional**: `TransitionalOptions`

#### Inherited from

AxiosRequestConfig.transitional

#### Defined in

node_modules/axios/index.d.cts:407

___

### transport

• `Optional` **transport**: `any`

#### Inherited from

AxiosRequestConfig.transport

#### Defined in

node_modules/axios/index.d.cts:401

___

### url

• `Optional` **url**: `string`

#### Inherited from

AxiosRequestConfig.url

#### Defined in

node_modules/axios/index.d.cts:374

___

### validateStatus

• `Optional` **validateStatus**: ``null`` \| (`status`: `number`) => `boolean`

#### Inherited from

AxiosRequestConfig.validateStatus

#### Defined in

node_modules/axios/index.d.cts:395

___

### withCredentials

• `Optional` **withCredentials**: `boolean`

#### Inherited from

AxiosRequestConfig.withCredentials

#### Defined in

node_modules/axios/index.d.cts:385

___

### withXSRFToken

• `Optional` **withXSRFToken**: `boolean` \| (`config`: `InternalAxiosRequestConfig`<`any`\>) => `undefined` \| `boolean`

#### Inherited from

AxiosRequestConfig.withXSRFToken

#### Defined in

node_modules/axios/index.d.cts:417

___

### xsrfCookieName

• `Optional` **xsrfCookieName**: `string`

#### Inherited from

AxiosRequestConfig.xsrfCookieName

#### Defined in

node_modules/axios/index.d.cts:390

___

### xsrfHeaderName

• `Optional` **xsrfHeaderName**: `string`

#### Inherited from

AxiosRequestConfig.xsrfHeaderName

#### Defined in

node_modules/axios/index.d.cts:391
