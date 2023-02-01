[bunnycdn-stream](../README.md) / [Exports](../modules.md) / [BunnyCdnStream](../modules/BunnyCdnStream.md) / CreateDirectUpload

# Interface: CreateDirectUpload

[BunnyCdnStream](../modules/BunnyCdnStream.md).CreateDirectUpload

## Table of contents

### Properties

- [endpoint](BunnyCdnStream.CreateDirectUpload.md#endpoint)
- [headers](BunnyCdnStream.CreateDirectUpload.md#headers)
- [metadata](BunnyCdnStream.CreateDirectUpload.md#metadata)
- [video](BunnyCdnStream.CreateDirectUpload.md#video)

## Properties

### endpoint

• **endpoint**: `string`

#### Defined in

[src/index.ts:745](https://github.com/dan-online/bunnycdn-stream/blob/f2e1c22/src/index.ts#L745)

___

### headers

• **headers**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `AuthorizationExpire` | `number` |
| `AuthorizationSignature` | `string` |
| `LibraryId` | `string` |
| `VideoId` | `string` |

#### Defined in

[src/index.ts:746](https://github.com/dan-online/bunnycdn-stream/blob/f2e1c22/src/index.ts#L746)

___

### metadata

• **metadata**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `collection` | `undefined` \| `string` |
| `filetype` | `string` |
| `title` | `string` |

#### Defined in

[src/index.ts:752](https://github.com/dan-online/bunnycdn-stream/blob/f2e1c22/src/index.ts#L752)

___

### video

• **video**: [`BunnyCdnStreamVideo`](../classes/BunnyCdnStreamVideo.md)

#### Defined in

[src/index.ts:744](https://github.com/dan-online/bunnycdn-stream/blob/f2e1c22/src/index.ts#L744)
