const { Client, ButtonInteraction } = require("discord.js");
const { Modal, TextInputComponent, showModal } = require("discord-modals");

module.exports = {
  id: "test1",
  /** 
  * @param {ButtonInteraction} interaction;
  * @param {Client} client;
  */
  async execute(interaction, client) {
    const modal = new Modal()
    .setCustomId("test1modal")
    .setTitle(`Testing Modal`)
    .addComponents(
      new TextInputComponent()
      .setCustomId("test1modaltext")
      .setLabel("Testing Text Input")
      .setStyle("SHORT")
      .setPlaceholder("Type Yes to continue.")
      .setMinLength(1)
      .setMaxLength(3)
      .setRequired(true)
    );

    showModal(modal, {
      client: client,
      interaction: interaction
    });
    
  }
}