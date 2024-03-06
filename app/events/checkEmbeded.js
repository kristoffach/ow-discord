// Import required modules
const wait = require('node:timers/promises').setTimeout
const { bold, italic, Events, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder  } = require('discord.js')

// Import strings used in response messages
const greeting = require('../commands/heroes/greeting.json')
const damage = require('../commands/heroes/damage.json')
const support = require('../commands/heroes/support.json')
const tank = require('../commands/heroes/tank.json')
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

// Check if main message and embed exists 336975117571588096
async function execute(client) {
  const { embedChannel, embedMessage } = require('../config')
  const channel = client.channels.cache.get(embedChannel)

  // Check if embeded message exists
  let message = undefined
  try {
    message = await channel.messages.fetch(embedMessage)
  } catch (error) {
    console.error("Message id doesn't exist, creating new")
  }

  // If embeded message doesn't exists, create a new
  if (!message) {
    // Create embed message
    const messageEmbed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Random hero picker v1')
      .setDescription('You can click one of the buttons below or start typing /random <role> in the chat to get a random hero')
      .setThumbnail('https://i.imgur.com/kzYW9zh.gif')
      .setTimestamp()

    // Define buttons
    const dps = new ButtonBuilder().setCustomId('random-damage').setLabel('Damage').setStyle(ButtonStyle.Danger)
    const tank = new ButtonBuilder().setCustomId('random-tank').setLabel('Tank').setStyle(ButtonStyle.Primary)
    const support = new ButtonBuilder().setCustomId('random-support').setLabel('Support').setStyle(ButtonStyle.Success)
    const flex = new ButtonBuilder().setCustomId('random-flex').setLabel('Flex').setStyle(ButtonStyle.Secondary)

    // Define row, include all buttons
    const buttonRow = new ActionRowBuilder()
      .addComponents(dps, tank, support, flex)

    const embeded = channel.send({
      embeds: [messageEmbed],
      components: [buttonRow],
    }).then(message => {
      // Console log the new message id
      console.log(message.id)
    })

    const collector = embeded.createMessageComponentCollector({
      componentType: ComponentType.Button,
    })

    collector.on('collect', async (interaction) => {
      const role = interaction.customId.split("-").pop()

      await interaction.reply({content: msg(role), ephemeral: true})
      await wait(15_000)
      await interaction.deleteReply()
    })
  }

  if (message) {
    const collector = message.createMessageComponentCollector({
      componentType: ComponentType.Button,
    })

    collector.on('collect', async (interaction) => {
      const role = interaction.customId.split("-").pop()

      await interaction.reply({content: msg(role), ephemeral: true})
      await wait(15_000)
      await interaction.deleteReply()
    })
  }
}

// Exports event
module.exports = { name: Events.ClientReady, once: true, execute }