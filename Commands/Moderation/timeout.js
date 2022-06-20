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
    .setTitle("User Timed Out")
    .setColor("RED")
    .setTimestamp()
    .setThumbnail(Target.avatarURL({dynamic: true}))
    .addField("**――――――――――**", `> **Username:** ${Target}\n > ID: ${Target.id}`)

    const Response = new MessageEmbed()
    .setColor("RED");

    switch(Time) {
      case "1m" : {Target.timeout(ms("1m"), Reason).catch((err) => {
          console.log("VOIDED || Couldn't timeout user.")
        return interaction.reply({embeds: [
            new MessageEmbed()
            .setColor("RED")
            .setDescription(`> An error has occured. ${Target} was not timed out.`)
          ], ephemeral: true})
        });
        Response.setDescription(`> Timed out ${Target} for 1m. Reason: ${Reason || "No reason provided."}`);
        LogMessage.addField("**――――――――――**", `> **Duration:** ${Time}\n > **Reason:** ${Reason || "No reason provided."}\n > **Staff:** ${Author}`)
        
      }
    break;
      case "5m" : {
        Target.timeout(ms("5m"), Reason).catch((err) => {
          console.log("VOIDED || Couldn't timeout user.")
          return interaction.reply({embeds: [
            new MessageEmbed()
            .setColor("RED")
            .setDescription(`> An error has occured. ${Target} was not timed out.`)
          ], ephemeral: true})
        });
        Response.setDescription(`> Timed out ${Target} for 5m. Reason: ${Reason || "No reason provided."}`);
        LogMessage.addField("**――――――――――**", `> **Duration:** ${Time}\n > **Reason:** ${Reason || "No reason provided."}\n **Staff:** > ${Author} `)
        
      }
        break;
      case "20m" : {
        Target.timeout(ms("20m"), Reason).catch((err) => {
          console.log("VOIDED || Couldn't timeout user.")
          return interaction.reply({embeds: [
            new MessageEmbed()
            .setColor("RED")
            .setDescription(`> An error has occured. ${Target} was not timed out.`)
          ], ephemeral: true})
        });
        Response.setDescription(`> Timed out ${Target} for 20m. Reason: ${Reason || "No reason provided."}`);
        LogMessage.addField("**――――――――――**", `> **Duration:** ${Time}\n > **Reason:** ${Reason || "No reason provided."}\n **Staff:** > ${Author}`)
        
      }
        break;
      case "1h" : {
        Target.timeout(ms("1h"), Reason).catch((err) => {
          console.log("VOIDED || Couldn't timeout user.")
          return interaction.reply({embeds: [
            new MessageEmbed()
            .setColor("RED")
            .setDescription(`> An error has occured. ${Target} was not timed out.`)
          ], ephemeral: true})
        });
        Response.setDescription(`> Timed out ${Target} for 1h. Reason: ${Reason || "No reason provided."}`);
        LogMessage.addField("**――――――――――**", `> **Duration:** ${Time}\n > **Reason:** ${Reason || "No reason provided."}\n **Staff:** > ${Author}`);
      }
        break;
      case "12h" : {
        Target.timeout(ms("12h"), Reason).catch((err) => {
          console.log("VOIDED || Couldn't timeout user.");
          return interaction.reply({embeds: [
            new MessageEmbed()
            .setColor("RED")
            .setDescription(`> An error has occured. ${Target} was not timed out.`)
          ], ephemeral: true})
        });
        Response.setDescription(`> Timed out ${Target} for 12h. Reason: ${Reason || "No reason provided."}`);
        LogMessage.addField("**――――――――――**", `> **Duration:** ${Time}\n > **Reason:** ${Reason || "No reason provided."}\n **Staff:** > ${Author}`);
      }
        break;
      case "1w" : {
        Target.timeout(ms("1w"), Reason).catch((err) => {
          console.log("VOIDED || Couldn't timeout user.")
          return interaction.reply({embeds: [
            new MessageEmbed()
            .setColor("RED")
            .setDescription(`> An error has occured. ${Target} was not timed out.`)
          ], ephemeral: true})
        });
        Response.setDescription(`> Timed out ${Target} for 1w. Reason: ${Reason || "No reason provided."}`);
        LogMessage.addField("**――――――――――**", `> **Duration:** ${Time}\n > **Reason:** ${Reason || "No reason provided."}\n **Staff:** > ${Author}\n `);
      }
    }

    interaction.reply({embeds: [Response]});
    return LogChannel.send({embeds: [LogMessage]});
  }
}