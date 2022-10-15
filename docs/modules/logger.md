[discord_bots_common](../README.md) / [Exports](../modules.md) / logger

# Namespace: logger

## Table of contents

### Enumerations

- [logLevel](../enums/logger.logLevel.md)

### Functions

- [debug](logger.md#debug)
- [error](logger.md#error)
- [info](logger.md#info)
- [log](logger.md#log)
- [warn](logger.md#warn)

## Functions

### debug

▸ **debug**(`message`): `void`

Log a debug message

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `any` | Message |

#### Returns

`void`

#### Defined in

[utils/logger.ts:35](https://github.com/dgudim/Discord-bots-common/blob/22e49ab/src/utils/logger.ts#L35)

___

### error

▸ **error**(`message`): `void`

Log an error message

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `any` | Message |

#### Returns

`void`

#### Defined in

[utils/logger.ts:59](https://github.com/dgudim/Discord-bots-common/blob/22e49ab/src/utils/logger.ts#L59)

___

### info

▸ **info**(`message`): `void`

Log an debug message

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `any` | Message |

#### Returns

`void`

#### Defined in

[utils/logger.ts:43](https://github.com/dgudim/Discord-bots-common/blob/22e49ab/src/utils/logger.ts#L43)

___

### log

▸ **log**(`message`, `color`): `void`

Base log function, log with any color

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `any` | Message |
| `color` | [`colors`](../enums/colors.colors.md) \| [`logLevel`](../enums/logger.logLevel.md) | color or logLevel |

#### Returns

`void`

#### Defined in

[utils/logger.ts:15](https://github.com/dgudim/Discord-bots-common/blob/22e49ab/src/utils/logger.ts#L15)

___

### warn

▸ **warn**(`message`): `void`

Log a warning message

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `any` | Message |

#### Returns

`void`

#### Defined in

[utils/logger.ts:51](https://github.com/dgudim/Discord-bots-common/blob/22e49ab/src/utils/logger.ts#L51)
