[discord_bots_common](../README.md) / [Exports](../modules.md) / colors

# Namespace: colors

## Table of contents

### Enumerations

- [colors](../enums/colors.colors.md)

### Functions

- [parse](colors.md#parse)
- [wrap](colors.md#wrap)

## Functions

### parse

▸ **parse**(`str`): `string`

parse the string containing colors.PREVIOUS replacing it with appropriate colors

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | input string |

#### Returns

`string`

parsed string

#### Defined in

[utils/colors.ts:68](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/colors.ts#L68)

___

### wrap

▸ **wrap**(`message`, `color`): `string`

function to colorize a part of the message

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `any` | input message |
| `color` | [`colors`](../enums/colors.colors.md) \| [`logLevel`](../enums/logger.logLevel.md) | target color |

#### Returns

`string`

wrapped message, pass through [parse](colors.md#parse) before printing

#### Defined in

[utils/colors.ts:38](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/colors.ts#L38)
