[**bunnycdn-stream**](../../../README.md) • **Docs**

***

[bunnycdn-stream](../../../globals.md) / [BunnyCdnStream](../README.md) / BunnyAxiosRequestConfig

# Interface: BunnyAxiosRequestConfig

## Extends

- `AxiosRequestConfig`

## Properties

### adapter?

> `optional` **adapter**: `AxiosAdapterConfig` \| `AxiosAdapterConfig`[]

#### Inherited from

`AxiosRequestConfig.adapter`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:386

***

### auth?

> `optional` **auth**: `AxiosBasicCredentials`

#### Inherited from

`AxiosRequestConfig.auth`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:387

***

### baseURL?

> `optional` **baseURL**: `string`

#### Inherited from

`AxiosRequestConfig.baseURL`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:376

***

### beforeRedirect()?

> `optional` **beforeRedirect**: (`options`, `responseDetails`) => `void`

#### Parameters

• **options**: `Record`\<`string`, `any`\>

• **responseDetails**

• **responseDetails.headers**: `Record`\<`string`, `string`\>

• **responseDetails.statusCode**: `HttpStatusCode`

#### Returns

`void`

#### Inherited from

`AxiosRequestConfig.beforeRedirect`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:399

***

### cancelToken?

> `optional` **cancelToken**: `CancelToken`

#### Inherited from

`AxiosRequestConfig.cancelToken`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:405

***

### data?

> `optional` **data**: `any`

#### Inherited from

`AxiosRequestConfig.data`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:382

***

### decompress?

> `optional` **decompress**: `boolean`

#### Inherited from

`AxiosRequestConfig.decompress`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:406

***

### env?

> `optional` **env**: `object`

#### FormData()?

> `optional` **FormData**: (...`args`) => `object`

##### Parameters

• ...**args**: `any`[]

##### Returns

`object`

#### Inherited from

`AxiosRequestConfig.env`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:410

***

### family?

> `optional` **family**: `AddressFamily`

#### Inherited from

`AxiosRequestConfig.family`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:414

***

### formSerializer?

> `optional` **formSerializer**: `FormSerializerOptions`

#### Inherited from

`AxiosRequestConfig.formSerializer`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:413

***

### headers

> **headers**: `AxiosRequestHeaders`

#### Overrides

`AxiosRequestConfig.headers`

#### Source

[src/index.ts:792](https://github.com/dan-online/bunnycdn-stream/blob/1f8579d/src/index.ts#L792)

***

### httpAgent?

> `optional` **httpAgent**: `any`

#### Inherited from

`AxiosRequestConfig.httpAgent`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:402

***

### httpsAgent?

> `optional` **httpsAgent**: `any`

#### Inherited from

`AxiosRequestConfig.httpsAgent`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:403

***

### insecureHTTPParser?

> `optional` **insecureHTTPParser**: `boolean`

#### Inherited from

`AxiosRequestConfig.insecureHTTPParser`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:409

***

### lookup?

> `optional` **lookup**: (`hostname`, `options`, `cb`) => `void` \| (`hostname`, `options`) => `Promise`\<`LookupAddress` \| [`LookupAddressEntry` \| `LookupAddressEntry`[], `AddressFamily`]\>

#### Inherited from

`AxiosRequestConfig.lookup`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:415

***

### maxBodyLength?

> `optional` **maxBodyLength**: `number`

#### Inherited from

`AxiosRequestConfig.maxBodyLength`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:396

***

### maxContentLength?

> `optional` **maxContentLength**: `number`

#### Inherited from

`AxiosRequestConfig.maxContentLength`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:394

***

### maxRate?

> `optional` **maxRate**: `number` \| [`number`, `number`]

#### Inherited from

`AxiosRequestConfig.maxRate`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:398

***

### maxRedirects?

> `optional` **maxRedirects**: `number`

#### Inherited from

`AxiosRequestConfig.maxRedirects`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:397

***

### method?

> `optional` **method**: `string`

#### Inherited from

`AxiosRequestConfig.method`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:375

***

### onDownloadProgress()?

> `optional` **onDownloadProgress**: (`progressEvent`) => `void`

#### Parameters

• **progressEvent**: `AxiosProgressEvent`

#### Returns

`void`

#### Inherited from

`AxiosRequestConfig.onDownloadProgress`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:393

***

### onUploadProgress()?

> `optional` **onUploadProgress**: (`progressEvent`) => `void`

#### Parameters

• **progressEvent**: `AxiosProgressEvent`

#### Returns

`void`

#### Inherited from

`AxiosRequestConfig.onUploadProgress`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:392

***

### params?

> `optional` **params**: `any`

#### Inherited from

`AxiosRequestConfig.params`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:380

***

### paramsSerializer?

> `optional` **paramsSerializer**: `ParamsSerializerOptions` \| `CustomParamsSerializer`

#### Inherited from

`AxiosRequestConfig.paramsSerializer`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:381

***

### proxy?

> `optional` **proxy**: `false` \| `AxiosProxyConfig`

#### Inherited from

`AxiosRequestConfig.proxy`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:404

***

### responseEncoding?

> `optional` **responseEncoding**: `string`

#### Inherited from

`AxiosRequestConfig.responseEncoding`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:389

***

### responseType?

> `optional` **responseType**: `ResponseType`

#### Inherited from

`AxiosRequestConfig.responseType`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:388

***

### signal?

> `optional` **signal**: `GenericAbortSignal`

#### Inherited from

`AxiosRequestConfig.signal`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:408

***

### socketPath?

> `optional` **socketPath**: `null` \| `string`

#### Inherited from

`AxiosRequestConfig.socketPath`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:400

***

### timeout?

> `optional` **timeout**: `number`

#### Inherited from

`AxiosRequestConfig.timeout`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:383

***

### timeoutErrorMessage?

> `optional` **timeoutErrorMessage**: `string`

#### Inherited from

`AxiosRequestConfig.timeoutErrorMessage`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:384

***

### transformRequest?

> `optional` **transformRequest**: `AxiosRequestTransformer` \| `AxiosRequestTransformer`[]

#### Inherited from

`AxiosRequestConfig.transformRequest`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:377

***

### transformResponse?

> `optional` **transformResponse**: `AxiosResponseTransformer` \| `AxiosResponseTransformer`[]

#### Inherited from

`AxiosRequestConfig.transformResponse`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:378

***

### transitional?

> `optional` **transitional**: `TransitionalOptions`

#### Inherited from

`AxiosRequestConfig.transitional`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:407

***

### transport?

> `optional` **transport**: `any`

#### Inherited from

`AxiosRequestConfig.transport`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:401

***

### url?

> `optional` **url**: `string`

#### Inherited from

`AxiosRequestConfig.url`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:374

***

### validateStatus?

> `optional` **validateStatus**: `null` \| (`status`) => `boolean`

#### Inherited from

`AxiosRequestConfig.validateStatus`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:395

***

### withCredentials?

> `optional` **withCredentials**: `boolean`

#### Inherited from

`AxiosRequestConfig.withCredentials`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:385

***

### withXSRFToken?

> `optional` **withXSRFToken**: `boolean` \| (`config`) => `undefined` \| `boolean`

#### Inherited from

`AxiosRequestConfig.withXSRFToken`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:417

***

### xsrfCookieName?

> `optional` **xsrfCookieName**: `string`

#### Inherited from

`AxiosRequestConfig.xsrfCookieName`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:390

***

### xsrfHeaderName?

> `optional` **xsrfHeaderName**: `string`

#### Inherited from

`AxiosRequestConfig.xsrfHeaderName`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/node\_modules/axios/index.d.cts:391
