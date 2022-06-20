const { CommandInteraction, MessageEmbed } = require("discord.js");
const ProfileDB = require("../../Structures/Schemas/Economy/ProfileDB");
const ms = require("ms");

module.exports = {
  name: "newsearch",
  description: "Search somewhere random for money.",
  permission: "SEND_MESSAGES",
  /** 
  * @param {CommandInteraction} interaction
  */
  async execute(interaction, client) {
    const Locations = [
            "car",
            "bathroom",
            "computer",
            "park",
            "closet",
            "pocket",
        ]
    const Chosen = Locations.sort(() => Math.random() - Math.random()).slice(0,3);
        const Filter = ({author, content}) => interaction.user == author && Chosen.some((Locations) => Locations.toLowerCase() == content.toLowerCase());
        const collector = interaction.channel.createMessageCollector({filter: Filter, time: ms("30s"), idle: ms("10s")});
        const Earnings = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

    
    interaction.reply({embeds: [
      new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`> Where would you like to search? \n> \`${Chosen.join('` `')}\``)
    ]}).then(
      collector.on("collect", async (m) => {
        if(m.content !== Chosen.some((Locations) => Locations.toLowerCase === m.content.toLowerCase)) {

          collector.stop({reason: "player"});
          
          return interaction.channel.send({embeds: [
          new MessageEmbed()
          .setColor("RED")
          .setDescription(`> That was not a valid selection, ${interaction.user}!`)
        ]});
          
        }
        await ProfileDB.findOneAndUpdate(
                {
                    GuildID: interaction.guild.id,
                    UserID: interaction.user.id,
                },
                {
                    $inc: {
                        Wallet: Earnings,
                    },
                }
            );

        return collector.stop({reason: "won"});
      }));

    collector.on("end", (collected, reason) => {
      if(reason === "time") return interaction.channel.send({embeds: [
        new MessageEmbed()
        .setColor("RED")
        .setDescription(`> You took too long to respond, ${interaction.user}!`)
      ]});
      if(reason === "player") return;
      
   if(reason === "won") {
      console.log(`VOIDED || Collected ${collected.size} messages.`);
      
    return interaction.channel.send({embeds: [
        new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`> You found **£${Earnings}**!`)
        ]});
       }
    });
  }
}