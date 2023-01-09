[discord_bots_common](../README.md) / [Exports](../modules.md) / guild\_utils

# Namespace: guild\_utils

## Table of contents

### Functions

- [createChannelIfNotExists](guild_utils.md#createchannelifnotexists)
- [createRoleIfNotExists](guild_utils.md#createroleifnotexists)
- [deleteChannelIfExists](guild_utils.md#deletechannelifexists)
- [deleteRoleIfExists](guild_utils.md#deleteroleifexists)
- [getAllGuilds](guild_utils.md#getallguilds)
- [getAllMembers](guild_utils.md#getallmembers)
- [swapRoles](guild_utils.md#swaproles)
- [tryToGetMember](guild_utils.md#trytogetmember)

## Functions

### createChannelIfNotExists

▸ **createChannelIfNotExists**(`guild`, `options`, `is_category?`): `Promise`<`undefined` \| `GuildBasedChannel`\>

Create channel or a channel category in a guild if it doesn't exist

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `guild` | `Guild` | Target guild |
| `options` | `GuildChannelCreateOptions` | Channel options |
| `is_category?` | `boolean` | Whether to create a category channel |

#### Returns

`Promise`<`undefined` \| `GuildBasedChannel`\>

Created or retrieved channel

#### Defined in

utils/guild_utils.ts:87

___

### createRoleIfNotExists

▸ **createRoleIfNotExists**(`guild`, `name`, `color`): `Promise`<`undefined` \| `Role`\>

Create a role in a guild if it doesn't exist

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `guild` | `Guild` | Target guild |
| `name` | `string` | Role name |
| `color` | `ColorResolvable` | Role color |

#### Returns

`Promise`<`undefined` \| `Role`\>

Created or retrieved role

#### Defined in

utils/guild_utils.ts:45

___

### deleteChannelIfExists

▸ **deleteChannelIfExists**(`guild`, `name`): `Promise`<`void`\>

Delete channel or a channel category in a guild if it exists

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `guild` | `Guild` | Target guild |
| `name` | `string` | Channel name |

#### Returns

`Promise`<`void`\>

#### Defined in

utils/guild_utils.ts:107

___

### deleteRoleIfExists

▸ **deleteRoleIfExists**(`guild`, `name`): `Promise`<`void`\>

Delete a role in a guild if it exists

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `guild` | `Guild` | Target guild |
| `name` | `string` | Role name |

#### Returns

`Promise`<`void`\>

#### Defined in

utils/guild_utils.ts:67

___

### getAllGuilds

▸ **getAllGuilds**(`client`): `Promise`<`Guild`[]\>

Get all guilds the bot is currently in

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `Client`<`boolean`\> | Bot client instance |

#### Returns

`Promise`<`Guild`[]\>

All guild

#### Defined in

utils/guild_utils.ts:27

___

### getAllMembers

▸ **getAllMembers**(`guild`): `Promise`<`GuildMember`[]\>

Get all members from a guild

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `guild` | `Guild` | Guild to get members from |

#### Returns

`Promise`<`GuildMember`[]\>

All members

#### Defined in

utils/guild_utils.ts:11

___

### swapRoles

▸ **swapRoles**(`prev_role_name`, `member`, `new_roles`): `Promise`<`void`\>

Update user's roles, e.g. rank roles or clan roles

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `prev_role_name` | `string` | Previous role name (starts with) |
| `member` | `GuildMember` | Target member |
| `new_roles` | [`none`](utils.md#none) \| `Role` \| `Role`[] | New role |

#### Returns

`Promise`<`void`\>

#### Defined in

utils/guild_utils.ts:142

___

### tryToGetMember

▸ **tryToGetMember**(`guild`, `memberId`): `Promise`<`undefined` \| `GuildMember`\>

Try to get a member from a guild by id, return undefined if it doesn't exist

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `guild` | `Guild` | Target guild |
| `memberId` | `string` | Member id |

#### Returns

`Promise`<`undefined` \| `GuildMember`\>

Guild member if found

#### Defined in

utils/guild_utils.ts:127
