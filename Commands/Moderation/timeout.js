const { CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "timeout",
  description: "Time outs a user for being bad L",
  permission: "MANAGE_GUILD",
  options: [
    {
      name: "target",
      description: "Input a user.",
      type: "USER",
      required: true
    },
    {
      name: "duration",
      description: "Select a duration",
      type: "STRING",
      required: true,
      choices: [
        {
          name: "1m",
          value: "1m"
        }, 
        {
          name: "5m",
          value: "5m"
        },
        {
          name: "20m",
          value: "2m"
        },
        {
          name: "1h",
          value: "1h"
        },
        {
          name: "12h",
          value: "12h"
        },
        {
          name: "1w",
          value: "1w"
        }
      ],
    },
    {
      name: "reason",
      description: "Input a reason for the timeout",
      type: "STRING",
    }
  ],
  /**
  * @param {CommandInteraction} interaction
  */
  async execute(interaction, client) {
    const LogChannel = client.channels.cache.get(process.env.logchannel);
    const Target = interaction.options.getMember("target");
    const Time = interaction.options.getString("duration");
    const Reason = interaction.options.getString("reason");
    const Author = interaction.user;

    if(!Target.moderatable) return interaction.reply({embeds: [
      new MessageEmbed()
      .setColor("RED")
      .setDescription(`> :no_entry_sign: You cannot timeout this user.`)
    ], ephemeral: true});

    if(Target.id === interaction.user.id) return interaction.reply({embeds: [
      new MessageEmbed()
      .setColor("RED")
      .setDescription(`> :no_entry_sign: You can't timeout yourself.`)
    ], ephemeral: true});

    if(!Target.manageable) return interaction.reply({embeds: [
      new MessageEmbed()
      .setColor("RED")
      .setDescription(`> :no_entry_sign: You cannot timeout this user.`)
    ], ephemeral: true});

    const LogMessage = new MessageEmbed()
    .setColor("RED")
    .setTimestamp()
    .setThumbnail(Target.avatarURL({dynamic: true}))
    .addField("**――――――――――**", `> **Timed Out:** ${Target}\n > **ID:** ${Target.id}\n > **Duration:** ${Time}\n > **Reason:** ${Reason || "No reason proivded."}\n > **Staff:** ${Author}`)

    const Response = new MessageEmbed()
    .setColor("RED")
    .setDescription(`> :white_check_mark: Timed out ${Target} for ${Time}.\n > **Reason:** ${Reason || "No reason provided."}`);

    Target.timeout(ms(Time), `${Reason || "VOIDED || No reason provided."}`);

    interaction.reply({embeds: [Response]});
    return LogChannel.send({embeds: [LogMessage]});
  }
}