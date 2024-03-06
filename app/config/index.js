// Read env for tokens
const dotenv = require('dotenv')
dotenv.config()

// Discord bot token
const token = process.env.DISCORD_TOKEN

// Misc configs
const clientId = process.env.DISCORD_CLIENTID
const guildId = process.env.DISCORD_GUILDID

// Channels and messages
const embedChannel = process.env.DISCORD_CHANNELID
const embedMessage = process.env.DISCORD_MESSAGEID

// Export variables
module.exports = { token, clientId, guildId, embedChannel, embedMessage }