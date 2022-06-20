const { createTranscript } = require("discord-html-transcripts");
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "archive",
  description: "Saves all content of a channel in an HTML file for staff to review.",
  permission: "MANAGE_GUILD",
  /**
  * @param {CommandInteraction} interaction
  */
  async execute(interaction, client) {
    const LogChannel = client.channels.cache.get(process.env.logchannel);
    const Author = interaction.user;
    const Channel = interaction.channel;
    

    const Response = new MessageEmbed()
    .setColor("BLUE")
    .setDescription(`> :white_check_mark: This channel has been archived. You can view it in <#${LogChannel.id}>.`)
    .setTimestamp();

    const LogMessage = new MessageEmbed()
    .setColor("BLUE")
    .setTitle("Channel Archived")
    .addField(`Channel`, `${Channel}`)
    .addField(`Staff`, `${Author}`, true)
    .setTimestamp();

    const attachment = await createTranscript(Channel, {
      limit: -1,
      returnBuffer: false,
      fileName: `${Channel.name}.html`
    });

    LogChannel.send({embeds: [LogMessage], files: [attachment]}).catch((error) => {
      console.log("VOIDED || Unable to send transcript to log channel.");
      return interaction.reply({embeds: [
        new MessageEmbed()
        .setColor("RED")
        .setDescription(`> :no_entry_sign: An error has occured. The channel has not been archived.`)
      ], ephemeral: true});
    });

    return interaction.reply({embeds: [Response]});
    
  }
}