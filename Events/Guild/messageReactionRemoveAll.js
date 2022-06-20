const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "messageReactionRemoveAll",

  async excecute(message, reactions, client) {
    const LogChannel = client.channels.cache.get(process.env.logchannel);
    if(!message.guild) return;

    const Response = new MessageEmbed()
    .setColor("BLURPLE")
    .setTimestamp()
    .setTitle("Message Updated")
    .addField("Author", `<@${message.author.id}>`)
    .addField("Sent At", `<t:${parseInt(message.createdTimestamp / 1000)}:R>`, true)
    .addField("Removed Reactions", `${reactions.cache.map(r => r).join("\n> ")}`)
    .addField("Count", `${reactions.count}`, true)
    .addField("**――――――――――**", `**Message Content:** \n> ${message.cleanContent}`)
    .addField("Channel:", `<#${message.channel.id}>`, true);
    
    LogChannel.send({embeds: [Response]});
  }
}