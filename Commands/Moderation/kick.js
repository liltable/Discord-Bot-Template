const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "kick",
  description: "Removes a member from the server.",
  permission: "KICK_MEMBERS",
  options: [
    {
      name: "target",
      type: "USER",
      description: "Select a user",
      required: true
    },
    {
      name: "reason",
      type: "STRING",
      description: "Input a reason for kicking the user",
      required: false
    }
  ],
  /** 
  * @param {CommandInteraction} interaction
  */
  async execute(interaction) {
    const Author = interaction.user;
    const Target = interaction.options.getMember("target");
    const Reason = interaction.options.getString("reason") || "No reason provided.";

    if(Target.id === Author.id) return interaction.reply({embeds: [
      new MessageEmbed()
      .setColor("RED")
      .setDescription(`> :no_entry_sign: You can't kick yourself.`)
    ], ephemeral: true});

    if(!Target.moderateable || !Target.kickable || !Target.manageable) return interaction.reply({embeds: [
      new MessageEmbed()
      .setColor("RED")
      .setDescription(`> :no_entry_sign: You don't have the necessary authority to kick this user.`)
    ], ephemeral: true});

    Target.kick(`${Reason}`);
    return interaction.reply({embeds: [
      new MessageEmbed()
      .setColor("RED")
      .setDescription(`> :white_check_mark: Successfully kicked ${Target} for **${Reason}**.`)
    ]});
  }
}