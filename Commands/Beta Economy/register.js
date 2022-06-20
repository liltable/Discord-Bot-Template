const { MessageEmbed, CommandInteraction } = require("discord.js")
const ProfileDB = require("../../Structures/Schemas/Economy/ProfileDB");

module.exports ={
    name: "register",
    description: "Register a profile if you do not have one.",
    permission: "SEND_MESSAGES",
    async execute(interaction) {
        let Profile = await ProfileDB.findOne({
            GuildID: interaction.guild.id,
            UserID: interaction.member.id,
        });
        if(!Profile) {
            await ProfileDB.create({
                GuildID: interaction.guild.id,
                UserID: interaction.member.id,
                Wallet: 1000,
                Bank: 0,
            });
            return interaction.reply({embeds: [new MessageEmbed().setColor("GREEN").setDescription("> I have created you a profile.")]})
        } else {
            interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription(`> You already have a profile.`)]});
        }
    }
}