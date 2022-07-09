const { Modal } = require("discord-modals");
const { MessageEmbed, Client } = require("discord.js");

module.exports = {
  id: "test1modal",
  /** 
    * @param {Modal} modal;
    * @param {Client} client;
  */
  async execute(modal, client) {

    const Boolean = modal.getTextInputValue("test1modaltext");

    const boolean = Boolean.toLowerCase();

    if(!["yes", "no"].includes(boolean)) return modal.followUp({embeds: [new MessageEmbed().setColor("RED").setDescription(`> :no_entry_sign: Invalid answer.`)]});
    
    if(boolean === "yes") return modal.followUp({embeds: [new MessageEmbed().setColor("GREEN").setDescription(`> :white_check_mark: Successfully completed the test.`)]});
    
    if(boolean === "no") return modal.followUp({embeds: [new MessageEmbed().setColor("RED").setDescription(`> :no_entry_sign: Failed the test.`)]});
    
    
  }
}