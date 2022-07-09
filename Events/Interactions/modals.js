const { MessageEmbed, Client } = require("discord.js");
const { Modal } = require("discord-modals");

module.exports = {
  name: "modalSubmit",
/** 
  * @param {Modal} modal;
  * @param {Client} client;
*/
  async execute(modal, client) {
    await modal.deferReply({ephemeral: true})
    
    let Modal = client.modals.get(modal.customId);
    
    if(!Modal) modal.followUp({embeds: [new MessageEmbed().setColor("RED").setDescription(`> :no_entry_sign: ERROR: Invalid modal.`)]});

    Modal.execute(modal, client);
    
  }
}