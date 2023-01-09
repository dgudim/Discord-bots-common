[discord_bots_common](../README.md) / [Modules](../modules.md) / utils

# Namespace: utils

## Table of contents

### Type Aliases

- [none](utils.md#none)
- [nullableString](utils.md#nullablestring)

### Variables

- [eight\_mb](utils.md#eight_mb)

### Functions

- [channelToString](utils.md#channeltostring)
- [clamp](utils.md#clamp)
- [fetchUrl](utils.md#fetchurl)
- [getAllUrlFileAttachements](utils.md#getallurlfileattachements)
- [getBaseLog](utils.md#getbaselog)
- [getDateTime](utils.md#getdatetime)
- [getFileHash](utils.md#getfilehash)
- [getFileName](utils.md#getfilename)
- [getSimpleEmbed](utils.md#getsimpleembed)
- [getStringHash](utils.md#getstringhash)
- [getValueIfExists](utils.md#getvalueifexists)
- [guildToString](utils.md#guildtostring)
- [hsvToRgb](utils.md#hsvtorgb)
- [isDirectory](utils.md#isdirectory)
- [isFile](utils.md#isfile)
- [isImageUrlType](utils.md#isimageurltype)
- [isPngOrJpg](utils.md#ispngorjpg)
- [isPngOrJpgUrlType](utils.md#ispngorjpgurltype)
- [isUrl](utils.md#isurl)
- [limitLength](utils.md#limitlength)
- [messageContentToString](utils.md#messagecontenttostring)
- [messageReply](utils.md#messagereply)
- [messageToString](utils.md#messagetostring)
- [normalize](utils.md#normalize)
- [normalizeStringArray](utils.md#normalizestringarray)
- [perc2color](utils.md#perc2color)
- [safeReply](utils.md#safereply)
- [secondsToDhms](utils.md#secondstodhms)
- [sendToChannel](utils.md#sendtochannel)
- [setOrAppendToMap](utils.md#setorappendtomap)
- [sleep](utils.md#sleep)
- [stripUrlScheme](utils.md#stripurlscheme)
- [userToString](utils.md#usertostring)
- [walk](utils.md#walk)

## Type Aliases

### none

Ƭ **none**: `undefined` \| ``null``

#### Defined in

[utils/utils.ts:14](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L14)

___

### nullableString

Ƭ **nullableString**: `string` \| [`none`](utils.md#none)

#### Defined in

[utils/utils.ts:15](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L15)

## Variables

### eight\_mb

• `Const` **eight\_mb**: `number`

#### Defined in

[utils/utils.ts:12](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L12)

## Functions

### channelToString

▸ **channelToString**(`channel`, `parse_guild?`): `string`

Сonvert a text channel to it's string representation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channel` | `TextBasedChannel` | Text channel from DiscordJS |
| `parse_guild?` | `boolean` | Whether to prepenf guild co channel |

#### Returns

`string`

String representation

#### Defined in

[utils/utils.ts:299](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L299)

___

### clamp

▸ **clamp**(`num`, `min`, `max`): `number`

Clamp a value between to limits

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `num` | `number` | Number to clamp |
| `min` | `number` | Lower limit |
| `max` | `number` | Lower limit |

#### Returns

`number`

Clamped value

#### Defined in

[utils/utils.ts:579](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L579)

___

### fetchUrl

▸ **fetchUrl**(`url`): `Promise`<{ `ok`: ``false`` = res.ok; `status`: `number` = res.status; `statusText`: `string` = res.statusText; `type`: `string` = "" } \| { `ok`: ``true`` = res.ok; `status`: `number` = res.status; `statusText`: `string` = res.statusText; `type`: `string` = buff.type }\>

Fetch a url

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | Url to fetch |

#### Returns

`Promise`<{ `ok`: ``false`` = res.ok; `status`: `number` = res.status; `statusText`: `string` = res.statusText; `type`: `string` = "" } \| { `ok`: ``true`` = res.ok; `status`: `number` = res.status; `statusText`: `string` = res.statusText; `type`: `string` = buff.type }\>

Fetch status

#### Defined in

[utils/utils.ts:605](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L605)

___

### getAllUrlFileAttachements

▸ **getAllUrlFileAttachements**(`interaction`, `url_key`, `attachement_key`, `check_if_image?`): `Promise`<`string`[]\>

Gets url and attachement from an interaction

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `interaction` | [`none`](utils.md#none) \| `ChatInputCommandInteraction`<`CacheType`\> | Interaction to get attachement urls from |
| `url_key` | `string` | Parameter key with url |
| `attachement_key` | `string` | Parameter key with an attachement |
| `check_if_image?` | `boolean` | Whether to chek if urls point to an image |

#### Returns

`Promise`<`string`[]\>

#### Defined in

[utils/utils.ts:473](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L473)

___

### getBaseLog

▸ **getBaseLog**(`base`, `number`): `number`

Get the log of a number with the base `base`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `base` | `number` | Base of the logarithm |
| `number` | `number` | Input number |

#### Returns

`number`

The log with the base

#### Defined in

[utils/utils.ts:61](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L61)

___

### getDateTime

▸ **getDateTime**(): `string`

#### Returns

`string`

Current date and time

#### Defined in

[utils/utils.ts:547](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L547)

___

### getFileHash

▸ **getFileHash**(`file`): `Promise`<`string`\>

Get file blake3 hash

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `string` | Input file |

#### Returns

`Promise`<`string`\>

Blake3 hash

#### Defined in

[utils/utils.ts:100](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L100)

___

### getFileName

▸ **getFileName**(`file`): `string`

Get file name from path of url

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `file` | `string` | Path/Url |

#### Returns

`string`

The last part of the path or url

#### Defined in

[utils/utils.ts:40](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L40)

___

### getSimpleEmbed

▸ **getSimpleEmbed**(`title`, `description`, `color`): `EmbedBuilder`

Construct a simple embed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `title` | `string` | Embed title |
| `description` | `string` | Embed description |
| `color` | `ColorResolvable` | Embed color |

#### Returns

`EmbedBuilder`

Constructed embed

#### Defined in

[utils/utils.ts:536](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L536)

___

### getStringHash

▸ **getStringHash**(`str`): `Promise`<`string`\>

Get string blake3 hash

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | Input String |

#### Returns

`Promise`<`string`\>

Blake3 hash

#### Defined in

[utils/utils.ts:109](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L109)

___

### getValueIfExists

▸ **getValueIfExists**(`db`, `path`): `Promise`<`any`\>

Get a value from a json database if it exists

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `db` | `JsonDB` | Json databse |
| `path` | `string` | Key path |

#### Returns

`Promise`<`any`\>

The value if it exists

#### Defined in

[utils/utils.ts:119](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L119)

___

### guildToString

▸ **guildToString**(`guild`): `string`

Convert a guild to it's string representation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `guild` | ``null`` \| `BaseGuild` \| [`string`, `OAuth2Guild`] | Guild from DiscordJS |

#### Returns

`string`

String representation

#### Defined in

[utils/utils.ts:313](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L313)

___

### hsvToRgb

▸ **hsvToRgb**(`h`, `s`, `v`): [red: number, green: number, blue: number]

Converts an HSV color value to RGB. Conversion formula
adapted from http://en.wikipedia.org/wiki/HSV_color_space.
Assumes h, s, and v are contained in the set [0, 1] and
returns r, g, and b in the set [0, 255].

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `h` | `number` | The hue |
| `s` | `number` | The saturation |
| `v` | `number` | The value |

#### Returns

[red: number, green: number, blue: number]

The RGB representation

#### Defined in

[utils/utils.ts:154](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L154)

___

### isDirectory

▸ **isDirectory**(`path`): `boolean`

Check is path leads to a directory

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` \| [`none`](utils.md#none) | Directory/File path |

#### Returns

`boolean`

True if the path leads to a directory

#### Defined in

[utils/utils.ts:22](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L22)

___

### isFile

▸ **isFile**(`path`): `boolean`

Check is path leads to a file

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` \| [`none`](utils.md#none) | Directory/File path |

#### Returns

`boolean`

True if the path leads to a file

#### Defined in

[utils/utils.ts:31](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L31)

___

### isImageUrlType

▸ **isImageUrlType**(`type`): `boolean`

Determine whether url type is image

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | file name |

#### Returns

`boolean`

Whether a url type is any image

#### Defined in

[utils/utils.ts:626](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L626)

___

### isPngOrJpg

▸ **isPngOrJpg**(`name`): `boolean`

Determine whether a file ends with png or jpg

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` \| [`none`](utils.md#none) | file name |

#### Returns

`boolean`

Whether a file ends with png or jpg

#### Defined in

[utils/utils.ts:617](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L617)

___

### isPngOrJpgUrlType

▸ **isPngOrJpgUrlType**(`type`): `boolean`

Determine whether url type is png or jpg

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | file name |

#### Returns

`boolean`

Whether a url type is png or jpg

#### Defined in

[utils/utils.ts:635](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L635)

___

### isUrl

▸ **isUrl**(`url`): `Promise`<`boolean`\>

Check whether a given string is url

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | [`nullableString`](utils.md#nullablestring) | Input url/not url |

#### Returns

`Promise`<`boolean`\>

Whether the input string is url

#### Defined in

[utils/utils.ts:83](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L83)

___

### limitLength

▸ **limitLength**(`str`, `max_length`): `string`

Limit the length of a string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | String to limit the length of |
| `max_length` | `number` | Maximum length of the string |

#### Returns

`string`

Limited string, adding ... if it's too long

#### Defined in

[utils/utils.ts:136](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L136)

___

### messageContentToString

▸ **messageContentToString**(`content`): `string`

Сonvert message content to it's string representation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `content` | `MessageContents` | Almost any message content from DiscordJS (Embed, string, Payload, etc.) |

#### Returns

`string`

String representation

#### Defined in

[utils/utils.ts:267](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L267)

___

### messageReply

▸ **messageReply**(`message`, `content`): `Promise`<`void`\>

Reply to a message

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `Message`<`boolean`\> | Message to reply to |
| `content` | `string` | Reply content |

#### Returns

`Promise`<`void`\>

#### Defined in

[utils/utils.ts:386](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L386)

___

### messageToString

▸ **messageToString**(`message`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `Message`<`boolean`\> |

#### Returns

`string`

#### Defined in

[utils/utils.ts:280](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L280)

___

### normalize

▸ **normalize**(`str`): `string`

Trim and lowercase a string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | [`nullableString`](utils.md#nullablestring) | String to normalize |

#### Returns

`string`

Lowercased and trimmed string

#### Defined in

[utils/utils.ts:51](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L51)

___

### normalizeStringArray

▸ **normalizeStringArray**(`arr`): `string`[]

Normalizes every element of the string array

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr` | `string`[] | Array to normalize |

#### Returns

`string`[]

Array with every value normalized

#### Defined in

[utils/utils.ts:70](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L70)

___

### perc2color

▸ **perc2color**(`perc`): `ColorResolvable`

Convert a percentage value to a gradient from red to green

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `perc` | `number` | Value in percent (0 - 100) |

#### Returns

`ColorResolvable`

Hex representation

#### Defined in

[utils/utils.ts:180](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L180)

___

### safeReply

▸ **safeReply**(`interaction`, `content`, `ephemeral?`): `Promise`<`void`\>

Safely reply to an interaction (if already replied send to channel, if deferred replied edit reply)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `interaction` | [`none`](utils.md#none) \| `CommandInteraction`<`CacheType`\> | `undefined` | Interaction to reply to |
| `content` | `MessageContents` | `undefined` | Reply content |
| `ephemeral` | `boolean` | `false` | Whether the reply is only visible to sender |

#### Returns

`Promise`<`void`\>

#### Defined in

[utils/utils.ts:397](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L397)

___

### secondsToDhms

▸ **secondsToDhms**(`seconds`): `string`

Convert seconds to days, hours, minutes and seconds

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `seconds` | `number` | Time in seconds |

#### Returns

`string`

Time in days, hours, minutes and seconds

#### Defined in

[utils/utils.ts:559](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L559)

___

### sendToChannel

▸ **sendToChannel**(`channel`, `content`, `logAsError?`): `Promise`<`void`\>

Send a message to a text channel

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channel` | [`none`](utils.md#none) \| `TextBasedChannel` | Discord text channel |
| `content` | [`none`](utils.md#none) \| `MessageContents` | Message contents |
| `logAsError?` | `boolean` | Whether to log to the console as error |

#### Returns

`Promise`<`void`\>

#### Defined in

[utils/utils.ts:338](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L338)

___

### setOrAppendToMap

▸ **setOrAppendToMap**<`K`, `V`\>(`map`, `key`, `value`): `boolean`

Add a new element with a specified key and value to the Map, or overwrite if exists

#### Type parameters

| Name |
| :------ |
| `K` |
| `V` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `map` | `Map`<`K`, `V`[]\> | Target map |
| `key` | `K` | Target key |
| `value` | `V` | Value to put |

#### Returns

`boolean`

True if the key was created

#### Defined in

[utils/utils.ts:646](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L646)

___

### sleep

▸ **sleep**(`ms`): `Promise`<`unknown`\>

Wait for some time

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ms` | `number` | time in milliseconds |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[utils/utils.ts:587](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L587)

___

### stripUrlScheme

▸ **stripUrlScheme**(`url`): `string`

Remove http/https scheme from a url

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | a url |

#### Returns

`string`

url without http/https scheme

#### Defined in

[utils/utils.ts:596](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L596)

___

### userToString

▸ **userToString**(`user`): `string`

Convert a user to it's string representation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `User` | User from DiscordJS |

#### Returns

`string`

String representation

#### Defined in

[utils/utils.ts:328](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L328)

___

### walk

▸ **walk**(`dir`): `string`[]

Get all images from a directory recursively

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dir` | `string` | Directory to walk |

#### Returns

`string`[]

List of images in a directory

#### Defined in

[utils/utils.ts:512](https://github.com/dgudim/Discord_bots-common/blob/master/src/utils/utils.ts#L512)
