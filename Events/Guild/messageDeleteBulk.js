const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "messageDeleteBulk",

  async execute(messages, channel, client) {
    const LogChannel = client.channels.cache.get(process.env.logchannel);

    const Response = new MessageEmbed()
    .setColor("RED")
    .setTitle("Message Purged")
    .setTimestamp()
    .addField("Channel", `> <#${channel.id}>`)
    .addField("Message Count", `> ${messages.count}`)

    return LogChannel.send({embeds: [Response]});
    
  }
}