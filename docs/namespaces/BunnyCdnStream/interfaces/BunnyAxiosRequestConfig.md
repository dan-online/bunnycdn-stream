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

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:327

***

### auth?

> `optional` **auth**: `AxiosBasicCredentials`

#### Inherited from

`AxiosRequestConfig.auth`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:328

***

### baseURL?

> `optional` **baseURL**: `string`

#### Inherited from

`AxiosRequestConfig.baseURL`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:317

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

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:340

***

### cancelToken?

> `optional` **cancelToken**: `CancelToken`

#### Inherited from

`AxiosRequestConfig.cancelToken`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:346

***

### data?

> `optional` **data**: `any`

#### Inherited from

`AxiosRequestConfig.data`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:323

***

### decompress?

> `optional` **decompress**: `boolean`

#### Inherited from

`AxiosRequestConfig.decompress`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:347

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

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:351

***

### family?

> `optional` **family**: `AddressFamily`

#### Inherited from

`AxiosRequestConfig.family`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:355

***

### formSerializer?

> `optional` **formSerializer**: `FormSerializerOptions`

#### Inherited from

`AxiosRequestConfig.formSerializer`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:354

***

### headers

> **headers**: `AxiosRequestHeaders`

#### Overrides

`AxiosRequestConfig.headers`

#### Source

[src/index.ts:1007](https://github.com/dan-online/bunnycdn-stream/blob/616be292d397c50e1db742e88f1022206d23e14f/src/index.ts#L1007)

***

### httpAgent?

> `optional` **httpAgent**: `any`

#### Inherited from

`AxiosRequestConfig.httpAgent`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:343

***

### httpsAgent?

> `optional` **httpsAgent**: `any`

#### Inherited from

`AxiosRequestConfig.httpsAgent`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:344

***

### insecureHTTPParser?

> `optional` **insecureHTTPParser**: `boolean`

#### Inherited from

`AxiosRequestConfig.insecureHTTPParser`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:350

***

### lookup?

> `optional` **lookup**: (`hostname`, `options`, `cb`) => `void` \| (`hostname`, `options`) => `Promise`\<`LookupAddress` \| [`LookupAddressEntry` \| `LookupAddressEntry`[], `AddressFamily`]\>

#### Inherited from

`AxiosRequestConfig.lookup`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:356

***

### maxBodyLength?

> `optional` **maxBodyLength**: `number`

#### Inherited from

`AxiosRequestConfig.maxBodyLength`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:337

***

### maxContentLength?

> `optional` **maxContentLength**: `number`

#### Inherited from

`AxiosRequestConfig.maxContentLength`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:335

***

### maxRate?

> `optional` **maxRate**: `number` \| [`number`, `number`]

#### Inherited from

`AxiosRequestConfig.maxRate`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:339

***

### maxRedirects?

> `optional` **maxRedirects**: `number`

#### Inherited from

`AxiosRequestConfig.maxRedirects`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:338

***

### method?

> `optional` **method**: `string`

#### Inherited from

`AxiosRequestConfig.method`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:316

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

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:334

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

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:333

***

### params?

> `optional` **params**: `any`

#### Inherited from

`AxiosRequestConfig.params`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:321

***

### paramsSerializer?

> `optional` **paramsSerializer**: `ParamsSerializerOptions` \| `CustomParamsSerializer`

#### Inherited from

`AxiosRequestConfig.paramsSerializer`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:322

***

### proxy?

> `optional` **proxy**: `false` \| `AxiosProxyConfig`

#### Inherited from

`AxiosRequestConfig.proxy`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:345

***

### responseEncoding?

> `optional` **responseEncoding**: `string`

#### Inherited from

`AxiosRequestConfig.responseEncoding`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:330

***

### responseType?

> `optional` **responseType**: `ResponseType`

#### Inherited from

`AxiosRequestConfig.responseType`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:329

***

### signal?

> `optional` **signal**: `GenericAbortSignal`

#### Inherited from

`AxiosRequestConfig.signal`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:349

***

### socketPath?

> `optional` **socketPath**: `null` \| `string`

#### Inherited from

`AxiosRequestConfig.socketPath`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:341

***

### timeout?

> `optional` **timeout**: `number`

#### Inherited from

`AxiosRequestConfig.timeout`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:324

***

### timeoutErrorMessage?

> `optional` **timeoutErrorMessage**: `string`

#### Inherited from

`AxiosRequestConfig.timeoutErrorMessage`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:325

***

### transformRequest?

> `optional` **transformRequest**: `AxiosRequestTransformer` \| `AxiosRequestTransformer`[]

#### Inherited from

`AxiosRequestConfig.transformRequest`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:318

***

### transformResponse?

> `optional` **transformResponse**: `AxiosResponseTransformer` \| `AxiosResponseTransformer`[]

#### Inherited from

`AxiosRequestConfig.transformResponse`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:319

***

### transitional?

> `optional` **transitional**: `TransitionalOptions`

#### Inherited from

`AxiosRequestConfig.transitional`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:348

***

### transport?

> `optional` **transport**: `any`

#### Inherited from

`AxiosRequestConfig.transport`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:342

***

### url?

> `optional` **url**: `string`

#### Inherited from

`AxiosRequestConfig.url`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:315

***

### validateStatus?

> `optional` **validateStatus**: `null` \| (`status`) => `boolean`

#### Inherited from

`AxiosRequestConfig.validateStatus`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:336

***

### withCredentials?

> `optional` **withCredentials**: `boolean`

#### Inherited from

`AxiosRequestConfig.withCredentials`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:326

***

### withXSRFToken?

> `optional` **withXSRFToken**: `boolean` \| (`config`) => `undefined` \| `boolean`

#### Inherited from

`AxiosRequestConfig.withXSRFToken`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:358

***

### xsrfCookieName?

> `optional` **xsrfCookieName**: `string`

#### Inherited from

`AxiosRequestConfig.xsrfCookieName`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:331

***

### xsrfHeaderName?

> `optional` **xsrfHeaderName**: `string`

#### Inherited from

`AxiosRequestConfig.xsrfHeaderName`

#### Source

node\_modules/.store/axios-npm-1.6.8-85cf1e7152/package/index.d.ts:332
