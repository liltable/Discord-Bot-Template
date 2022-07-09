const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "modaltest",
  description: "test command",
  permission: "MANAGE_GUILD",
  /**
  * @param {CommandInteraction} interaction;
  */

  execute(interaction) {
    const Response = new MessageEmbed()
    .setColor("RANDOM")
    .setDescription("test button lmfao");

    const Row = new MessageActionRow()
    Row.addComponents(
      new MessageButton()
      .setCustomId("test1")
      .setStyle("DANGER")
      .setLabel("first"),
      new MessageButton()
      .setCustomId("test2")
      .setStyle("SUCCESS")
      .setLabel("second")
    );

    return interaction.reply({embeds: [Response], components: [Row]});
  }
}