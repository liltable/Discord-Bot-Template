const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "roleDelete",

  async execute(role, client) {
    const LogChannel = client.channels.cache.get(process.env.logchannel);

    const Response = new MessageEmbed()
    .setColor(role.hexColor)
    .setTitle("Role Deleted")
    .addField("Role:", `${role.name}`)
    .addField("Created At:", `<t:${parseInt(role.createdTimestamp / 1000)}:R>`, true)
    .addField("Mentionable?", `> ${role.mentionable}`)
    .addField("Editable?", `> ${role.editable}`, true)
    .addField("Managed by Bot?", `> ${role.managed}`, true)
    .addField("Hoisted?", `> ${role.hoist}`);

    return LogChannel.send({embeds: [Response]});
  }
}