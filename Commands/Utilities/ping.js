const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Checks the latency of the bot.",

  /**
    * @param {CommandInteraction} interaction
*/

  async execute(interaction, client) {
    return interaction.reply({embeds: [
      new MessageEmbed()
      .setColor("PURPLE")
      .setDescription(`> The bots latency is ${client.ws.ping}ms.`)
    ], ephemeral: true});
  }
}