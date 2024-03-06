const { Events } = require('discord.js')

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName)

      if (!command) {return console.error(`No command matching ${interaction.commandName} was found.`)}

      try {
        await command.execute(interaction)
      } catch (error) {
        console.error(`Error executing ${interaction.commandName}`)
        console.error(error)
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true })
        } else {
          await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
        }
      }
    }

    // Button interactions
    if (interaction.isButton()) {
      // emty
    }

    // Menu/select interactions
    if (interaction.isStringSelectMenu()) {
      // respond to the select menu
    }
	},
}