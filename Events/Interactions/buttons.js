const { ButtonInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /** 
  * @param {ButtonInteraction} interaction;
  */

  async execute(interaction, client) {
    if(!interaction.isButton()) return;
    let Button = client.buttons.get(interaction.customId);

    if(!Button) return interaction.reply({embeds: [
      new MessageEmbed()
      .setColor("RED")
      .setDescription(`> :no_entry_sign: ERROR: Invalid button.`)
    ], ephemeral: true});

    if(Button.permission && !interaction.member.permissions.has(Button.permission)) return interaction.reply({embeds: [
      new MessageEmbed()
      .setColor("RED")
      .setDescription(`> :no_entry_sign: ERROR: Invalid permissions.`)
    ], ephemeral: true});

    if(Button.ownerOnly && interaction.member.id !== interaction.guild.ownerId) return interaction.reply({embeds: [
      new MessageEmbed()
      .setColor("RED")
      .setDescription(`> :no_entry_sign: ERROR: Invalid user.`)
    ], ephemeral: true});

    Button.execute(interaction, client)
      /* .catch(() => {
      return interaction.reply({embeds: [
        new MessageEmbed()
        .setColor("RED")
        .setDescription(`> :no_entry_sign: An error has occurred. Please contact support if this issue persists.`)
      ], ephemeral: true});
    }); */
  }
}