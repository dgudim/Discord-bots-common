[discord_bots_common](../README.md) / [Modules](../modules.md) / init\_utils

# Namespace: init\_utils

## Table of contents

### Functions

- [dkrInit](init_utils.md#dkrinit)
- [getClient](init_utils.md#getclient)
- [getEnvironmentVar](init_utils.md#getenvironmentvar)
- [testEnvironmentVar](init_utils.md#testenvironmentvar)

## Functions

### dkrInit

▸ **dkrInit**(`client`, `project_root_dir`): `DKRCommands`

Get DKRCommands commands handler instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | `Client`<`boolean`\> | A discord bot client instance |
| `project_root_dir` | `string` | Project root directory (__dirname) |

#### Returns

`DKRCommands`

DKRCommands commands handler instance

#### Defined in

[utils/init_utils.ts:48](https://github.com/dgudim/Discord-bots-common/blob/286d453/src/utils/init_utils.ts#L48)

___

### getClient

▸ **getClient**(`intents?`): `Client`<`boolean`\>

Get a discord bot client instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `intents?` | `BitFieldResolvable`<``"Guilds"`` \| ``"GuildMembers"`` \| ``"GuildBans"`` \| ``"GuildEmojisAndStickers"`` \| ``"GuildIntegrations"`` \| ``"GuildWebhooks"`` \| ``"GuildInvites"`` \| ``"GuildVoiceStates"`` \| ``"GuildPresences"`` \| ``"GuildMessages"`` \| ``"GuildMessageReactions"`` \| ``"GuildMessageTyping"`` \| ``"DirectMessages"`` \| ``"DirectMessageReactions"`` \| ``"DirectMessageTyping"`` \| ``"MessageContent"`` \| ``"GuildScheduledEvents"``, `number`\> | Bot intents |

#### Returns

`Client`<`boolean`\>

A discord bot client instance with specified intents or default ones if none were provided

#### Defined in

[utils/init_utils.ts:65](https://github.com/dgudim/Discord-bots-common/blob/286d453/src/utils/init_utils.ts#L65)

___

### getEnvironmentVar

▸ **getEnvironmentVar**(`var_name`, `default_value?`): `string`

Get an environment variable

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `var_name` | `string` | `undefined` | Environment variable name |
| `default_value` | `string` | `""` | Fallback value |

#### Returns

`string`

Variable contents of fallback value

#### Defined in

[utils/init_utils.ts:38](https://github.com/dgudim/Discord-bots-common/blob/286d453/src/utils/init_utils.ts#L38)

___

### testEnvironmentVar

▸ **testEnvironmentVar**(`var_name`, `exit`, `is_file?`): `void`

Test if an environment variable is set

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `var_name` | `string` | Environment variable name |
| `exit` | `boolean` | Whether to exit if the variable is not set |
| `is_file?` | `boolean` | Whether the variable should point to a file |

#### Returns

`void`

#### Defined in

[utils/init_utils.ts:14](https://github.com/dgudim/Discord-bots-common/blob/286d453/src/utils/init_utils.ts#L14)
