// Import node functionality
const fs = require('node:fs')
const path = require('node:path')

// Import classes from discord.js
const { Client, Collection, Events, GatewayIntentBits, Partials  } = require('discord.js')

// Create a new client and login
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
})

// Import discord bot api token and login, glhf!
const { token } = require('./config')
client.login(token)

// Load available commands
client.commands = new Collection()
const { commands } = require('./commands')
for (const command of commands) {
  client.commands.set(command.data?.name, command)
}

// Load available events
const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file)
	const event = require(filePath)
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args))
	} else {
		client.on(event.name, (...args) => event.execute(...args))
	}
}