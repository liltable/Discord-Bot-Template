const { Client, ButtonInteraction } = require("discord.js");
const { showModal, TextInputComponent, Modal } = require("discord-modals");

module.exports = {
  id: "test2",
  /** 
  * @param {Client} client;
  * @param {ButtonInteraction} interaction;
  * @param {Modal} modal;
  */
  async execute(interaction, client) {
    const modal = new Modal()
    .setCustomId("test2modal")
    .setTitle("Second Testing Modal")
    .addComponents(
      new TextInputComponent()
      .setCustomId("test2modaltext")
      .setLabel("Are u chad?")
      .setStyle("SHORT")
      .setPlaceholder("tell me if u chad or not")
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