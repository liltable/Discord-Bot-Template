const { MessageEmbed, CommandInteraction } = require("discord.js")
const ProfileDB = require("../../Structures/Schemas/Economy/ProfileDB");

module.exports ={
    name: "balance",
    description: "Get your balance",
    permission: "SEND_MESSAGES",
    options: [
        { 
            name: "target", 
            description: "User to transfer money to.", 
            type: "USER",
        },
    ],
    async execute(interaction) {
        const User = interaction.options.getMember("target") || interaction.user;
        let Profile = await ProfileDB.findOne({
            GuildID: interaction.guild.id,
            UserID: User.id,
            //Wallet: 1000,
            //Bank: 0,
        });
        if(!Profile) {
            return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription("> You or this person does not have a profile.")]})
        } else {
            interaction.reply({embeds: [new MessageEmbed().setColor("#1ad4a8").setDescription(`> User Wallet: \`£${Profile.Wallet}\`\n> User Bank: \`£${Profile.Bank}\``).setTitle("</> | Economy")]});
        }
    }
}