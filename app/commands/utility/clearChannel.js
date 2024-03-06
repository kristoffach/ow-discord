// Import required modules
const { SlashCommandBuilder } = require('discord.js')

// Define the data of this command and optional options
const data = new SlashCommandBuilder()
  .setName('channel-clear')
  .setDescription('Removes the latest 100 posts in this channel')

// Define what happens when command executes
async function execute(interaction) {
  await interaction.reply('Pong!')
}

// Exports data and execute as an object
module.exports = { data, execute }