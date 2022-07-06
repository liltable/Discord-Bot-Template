const { CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require("ms");
const DB = require("../../Structures/Schemas/antispam.js");

module.exports = {
  name: "antispam-setup",
  description: "Configurates the antispam system. READ THE DESCRIPTIONS OF THE OPTIONS",
  permission: "ADMINISTRATOR",
  options: [
    {
      name: "enabled",
      description: "Toggle whether you want the system enabled or disabled.",
      type: "BOOLEAN",
      required: true
    },
    {
      name: "channel",
      description: "Where should the logs be sent?",
      type: "CHANNEL",
      required: true
    },
    {
      name: "time",
      description: "How much time should pass between messages before they're considered spam? || IN SECONDS",
      type: "NUMBER",
      required: true
    },
    {
      name: "warns",
      description: "How many messages before the user gets warned?",
      type: "NUMBER",
      required: false
    },
    
    {
      name: "message",
      description: "Set the warn message. || User: {user_tag}",
      type: "STRING",
      required: false
    },
    {
      name: "duplicates",
      description: "How many duplicated messages should trigger a warning?",
      type: "NUMBER",
      required: false
    },
    {
      name: "delete",
      description: "Should a flagged message be deleted?",
      type: "BOOLEAN",
      required: false
    }
  ],
  /**
  * @param {CommandInteraction} interaction
  */
  async execute(interaction, client) {
    let Profile = DB.findOne({GuildID: interaction.guild.id});

    const LogChannel = interaction.options.getChannel("channel");
    
      if(!Profile) { 
        DB.create({
      GuildID: interaction.guild.id,
      Enabled: interaction.options.getBoolean("enabled"),
      WarnThreshold: interaction.options.getNumber("warns") || 0,
      MaxInterval: ms(interaction.options.getNumber("time")),
      WarnMessage: interaction.options.getString("message") || `{user_tag} has been caught spamming. Please stop.`,
      MaxDuplicatesWarning: interaction.options.getNumber("duplicates") || 6,
      IgnoredPermissions: ["ADMINISTRATOR", "MANAGE_GUILD"],
      IgnoredMembers: [`${interaction.guild.ownerId}`, `${client.ownerId}`],
      RemoveMessages: interaction.options.getBoolean("delete"),
      ModLogsChannelName: interaction.options.getChannel("channel").name
      }).catch((error) => {
          console.log(`VOIDED || An error has occured. Couldn't create antispam database entry for ${interaction.guild.name}.`)
      });

  console.log(`VOIDED || Created antispam entry for ${interaction.guild.name}.`);
        
  interaction.reply({embeds: [
    new MessageEmbed()
    .setColor("GREEN")
    .setTitle("Success!")
    .setDescription("Successfully configured the anti-spam settings for this server.")
    .addField("Your Settings", `> **Enabled**: ${interaction.options.getBoolean("enabled")}\n > **Warn Threshold:** ${interaction.options.getNumber("warns") || "Default. (6)"}\n > **Message Interval:** ${interaction.options.getNumber("time") || "Default. (2s)"}\n > **Warn Message:** ${interaction.options.getString("message") || "Default. ([user] has been caught spamming. Please stop.)"}\n > **Duplicates Threshold:** ${interaction.options.getNumber("numbers") || "Default. (6)"}\n > **Delete Messages?** ${interaction.options.getBoolean("delete") || "Default (false)"}\n > **Logging Channel:** ${interaction.options.getChannel("channel")}`)
    .setTimestamp()  
  ], ephemeral: true});

        return LogChannel.send({embeds: [
          new MessageEmbed()
          .setColor("RED")
          .setTitle("Antispam Settings Created")
          .setDescription("Successfully configured the anti-spam settings for this server.")
          .addField("Your Settings", `> **Enabled**: ${interaction.options.getBoolean("enabled")}\n > **Warn Threshold:** ${interaction.options.getNumber("warns") || "Default. (6)"}\n > **Message Interval:** ${interaction.options.getNumber("time") || "Default. (2s)"}\n > **Warn Message:** ${interaction.options.getString("message") || "Default. ([user] has been caught spamming. Please stop.)"}\n > **Duplicates Threshold:** ${interaction.options.getNumber("numbers") || "Default. (6)"}\n > **Delete Messages?** ${interaction.options.getBoolean("delete") || "Default (false)"}\n > **Logging Channel:** ${interaction.options.getChannel("channel")}`)
          .addField(`Staff:`, `${interaction.user}`)
    .setTimestamp() 
        ]});
    }
    
    if(Profile) {
      DB.findOneAndUpdate({
         GuildID: interaction.guild.id,
      Enabled: interaction.options.getBoolean("enabled"),
      WarnThreshold: interaction.options.getNumber("warns") || 0,
      MaxInterval: ms(interaction.options.getNumber("time")) || 2000,
      WarnMessage: interaction.options.getString("message") || `{user_tag} has been caught spamming. Please stop.`,
      MaxDuplicatesWarning: interaction.options.getNumber("duplicates") || 6,
      IgnoredPermissions: ["ADMINISTRATOR", "MANAGE_GUILD"],
      IgnoredMembers: [`${interaction.guild.ownerId}`, `${client.ownerId}`],
      RemoveMessages: interaction.options.getBoolean("delete"),
      ModLogsChannelName: interaction.options.getChannel("channel").name
      });

       interaction.reply({embeds: [
          new MessageEmbed()
          .setColor("GREEN")
        .setTitle("Success!")
        .setDescription("Successfully configured the anti-spam settings for this server.")
        .addField("Your Settings", `> **Enabled**: ${interaction.options.getBoolean("enabled")}\n > **Warn Threshold:** ${interaction.options.getNumber("warns") || "Default. (6)"}\n > **Message Interval:** ${interaction.options.getNumber("time") || "Default. (2s)"}\n > **Warn Message:** ${interaction.options.getString("message") || "Default. ([user] has been caught spamming. Please stop.)"}\n > **Duplicates Threshold:** ${interaction.options.getNumber("numbers") || "Default. (6)"}\n > **Delete Messages?** ${interaction.options.getBoolean("delete") || "Default (false)"}\n > **Logging Channel:** ${interaction.options.getChannel("channel")}`)
        .setTimestamp()  
        ]});

      return LogChannel.send({embeds: [
          new MessageEmbed()
          .setColor("GREEN")
          .setTitle("Antispam Settings Changed")
          .setDescription("Successfully configured the anti-spam settings for this server.")
          .addField("Your Settings", `> **Enabled**: ${interaction.options.getBoolean("enabled")}\n > **Warn Threshold:** ${interaction.options.getNumber("warns") || "Default. (6)"}\n > **Message Interval:** ${interaction.options.getNumber("time") || "Default. (2s)"}\n > **Warn Message:** ${interaction.options.getString("message") || "Default. ([user] has been caught spamming. Please stop.)"}\n > **Duplicates Threshold:** ${interaction.options.getNumber("numbers") || "Default. (6)"}\n > **Delete Messages?** ${interaction.options.getBoolean("delete") || "Default (false)"}\n > **Logging Channel:** ${interaction.options.getChannel("channel")}`)
           .addField(`Staff:`, `${interaction.user}`)
           .setTimestamp()  
        ]});
    }
    
    console.log(`VOIDED || An error has occurred. The antispam settings for ${interaction.guild.name} weren't configured.`);
    
    return interaction.reply({embeds: [
      new MessageEmbed()
      .setColor("RED")
      .setDescription(`> :no_entry_sign: An unknown error has occured.`)
    ], ephemeral: true}).catch();
    
  }
}