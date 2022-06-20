const { MessageEmbed, CommandInteraction, Message, ContextMenuInteraction } = require("discord.js")
const ProfileDB = require("../../Structures/Schemas/Economy/ProfileDB");

module.exports ={
    name: "search",
    description: "Search from somewhere for money.",
    permission: "SEND_MESSAGES",
    async execute(interaction, message) {
        const Locations = [
            "Car",
            "Bathroom",
            "Computer",
            "Park",
            "Closet",
            "Pocket",
        ]
        const Chosen = Locations.sort(() => Math.random() - Math.random()).slice(0,3);
        const Filter = ({author, content}) => message.author == author && Chosen.some((Locations) => Locations.toLowerCase() == content.toLowerCase());
        const collector = interaction.channel.createMessageCollector({Filter, max: 1, time: 25000});
        const Earnings = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

        collector.on("collect", async (m) => {
            console.log(m);
            interaction.channel.send({embeds: [new MessageEmbed().setColor("GREEN").setDescription(`> You found \`£${Earnings}\``)]});

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
        });
        collector.on("end", (collected, reason) => {
            if (reason == "time") {
                interaction.channel.send({embeds: [new MessageEmbed().setColor("GREEN").setDescription(`> You ran out of time!`)]});
            }
        })
        interaction.reply({embeds: [new MessageEmbed().setColor("GREEN").setDescription(`> Where would you like to search?\n> \`${Chosen.join('` `')}\``)]})
    },
};