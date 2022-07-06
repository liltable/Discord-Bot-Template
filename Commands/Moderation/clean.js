const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "clean",
  description: "Cleans a number of messages from the channel",
  permission: "MANAGE_MESSAGES",
  options: [
    {
      name: "amount",
      description: "input the number of messages you want to delete",
      type: "NUMBER",
      required: true
    },
    {
      name: "target",
      description: "input the user whose messages you want to delete",
      type: "USER",
      required: false
    }
  ],
  /**
  * @param {CommandInteraction} interaction
  */

  async execute(interaction, client) {
    const { channel, options } = interaction;
    const Logger = client.channels.cache.get(process.env.vlogchannel)

        const Amount = options.getNumber("amount");
        const Target = options.getUser("target");
        const Author = interaction.user;
        const Channel = interaction.channel;

        const Messages = await channel.messages.fetch();

        const Response = new MessageEmbed()
        .setColor("RED")

      const LogMessage = new MessageEmbed()
      .setColor("RED")
      .setTitle("**――――――――――**")
      .setThumbnail(Author.avatarURL({dynamic: true, size: 512}))
      .setTimestamp()
      .addField("Staff:", `${Author}`)
      .addField("Deleted:", `${Amount} message(s)`, true)
      .addField("Channel:", `${Channel}`, true)

        if(Target) {
            let i = 0;
            const filtered = [];
            (await Messages).filter((m) => {
                if(m.author.id === Target.id && Amount > i) {
                    filtered.push(m);
                    i++;

                }
            })

            await channel.bulkDelete(filtered, true).catch((error) => {
              return interaction.reply({embeds: [
                new MessageEmbed()
                .setColor("RED")
                .setDescription("> :no_entry_sign: The amount of messages deleted must be less than or equal to 100.")
              ]})
            }).then(messages => {
                Response.setDescription(`Cleared ${messages.size} message(s) from ${Target}.`)
                interaction.reply({embeds: [Response], ephemeral: true});
                  return Logger.send({embeds: [LogMessage]});
            });
          
        } else {
            await channel.bulkDelete(Amount, true).catch((error) => {
              return interaction.reply({embeds: [
                new MessageEmbed()
                .setColor("RED")
                .setDescription("> :no_entry_sign: The amount of messages deleted must be less than or equal to 100.")
              ]});
            }).then(messages => {
                Response.setDescription(`> Cleared ${messages.size} message(s) from this channel.`);
              interaction.reply({embeds: [Response], ephemeral: true});
              return Logger.send({embeds: [LogMessage]});
            });
      }
        
  }
  
}