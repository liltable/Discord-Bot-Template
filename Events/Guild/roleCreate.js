const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "roleCreate",

  async execute(role, client) {
    const LogChannel = client.channels.cache.get(process.env.logchannel);

    const Response = new MessageEmbed()
    .setTimestamp()
    .setColor(`${role.hexColor}`)
    .setTitle("Role Created")
    .addField("Name:", `${role.name}`)
    .addField("Created At:", `<t:${parseInt(role.createdTimestamp / 1000)}:R>`, true)
    .addField("Mentionable?", `> ${role.mentionable}`)
    .addField("Editable?", `> ${role.editable}`, true)
    .addField("Managed by Bot?", `> ${role.managed}`, true)
    .addField("Hoisted?", `> ${role.hoist}`)
    .addField("**――――――――――**", `**ID**, \n > ${role.id}`)

    return LogChannel.send({embeds: [Response]});
  }
}