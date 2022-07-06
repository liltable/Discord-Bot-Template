const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ban",
  description: "Blacklists a member from the server.",
  permission: "BAN_MEMBERS",
  options: [
    {
      name: "target",
      description: "Select a user.",
      type: "USER",
      required: true
    }, 
    {
      name: "reason",
      description: "Input a reason for the ban.",
      type: "STRING",
      required: false
    },
    {
      name: "messages",
      description: "Select how many messages to delete.",
      type: "STRING",
      choices: [
        {
          name: "From the previous day",
          value: "1"
        },
        {
          name: "From the previous 7 days",
          value: "7"
        }
      ],
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
    const Messages = interaction.options.getString("messages");

    if(Target.id === Author.id) return interaction.reply({embeds: [
      new MessageEmbed()
      .setColor("RED")
      .setDescription(`> :no_entry_sign: You can't ban yourself.`)
    ], ephemeral: true});

    if(!Target.bannable || !Target.moderateable || !Target.manageable) return interaction.reply({embeds: [
      new MessageEmbed()
      .setColor("RED")
      .setDescription(`> :no_entry_sign: You lack the authority to ban this member.`)
    ], ephemeral: true});

    Target.ban({ deleteMessageDays: `${Messages}`, reason: `${Reason}`});

    interaction.reply({embeds: [
      new MessageEmbed()
      .setColor("RED")
      .setDescription(`> :white_check_mark: Successfully banned ${Target} for **${Reason}**.`)
    ]});
  }
}