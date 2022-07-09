const { Modal } = require("discord-modals");
const { MessageEmbed, Client } = require("discord.js");
const ms = require("ms");

module.exports = {
  id: "test2modal",
  /** 
  * @param {Modal} modal'
  * @param {Client} client;
  */
  async execute(modal, client) {

    const Chad = modal.getTextInputValue("test2modaltext").toLowerCase();

    if(!["yes", "no", "ye"].includes(Chad)) return modal.followUp({embeds: [
      new MessageEmbed()
      .setColor("RED")
      .setDescription(`> :No_entry_sign: Not a valid answer.`)
    ]});

    if(Chad === "yes" || Chad === "ye") {
      return modal.followUp({embeds: [new MessageEmbed().setColor("GREEN").setDescription(`> :white_check_mark: You are now recognized as a chad.`)]});
    } else if(Chad === "no") return modal.followUp({embeds: [new MessageEmbed().setColor("RED").setDescription("> :no_entry_sign: You are not a chad.")]}) && modal.member.timeout(ms("1m"), "Not a chad.").catch((error) => {});
    
  }
}