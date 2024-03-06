// Import required modules
const { bold, italic, SlashCommandBuilder } = require('discord.js')
const wait = require('node:timers/promises').setTimeout

// Import strings used in response messages
const greeting = require('../heroes/greeting.json')
const damage = require('../heroes/damage.json')
const support = require('../heroes/support.json')
const tank = require('../heroes/tank.json')
const flex = [...damage, ...support, ...tank]

// Respond with message using random helper function
const returnRandom = (arr) => arr[Math.floor(Math.random()*arr.length)]
const msg = (role) => {
  const response = italic(returnRandom(greeting)) + " "

  switch (role) {
    case 'damage': return response + bold(returnRandom(damage))
    case 'support': return response + bold(returnRandom(support))
    case 'tank': return response + bold(returnRandom(tank))
    default: return response + bold(returnRandom(flex))
  }
}

// Define the data of this command and optional options
const data = new SlashCommandBuilder()
  .setName('random')
	.setDescription('Get a random overwatch hero')
	.addStringOption(option => option
    .setName('role')
    .setDescription('Get a random hero for a specific role')
    .addChoices(
      { name: 'dps', value: 'damage' },
      { name: 'support', value: 'support' },
      { name: 'tank', value: 'tank' },
    ))
  ;

// Define what happens when command executes
async function execute(interaction) {
  const role = interaction.options.getString('role')

  await interaction.reply({content: msg(role), ephemeral: true})
  await wait(15_000)
  await interaction.deleteReply()
}

// Exports data and execute as an object
module.exports = { data, execute }