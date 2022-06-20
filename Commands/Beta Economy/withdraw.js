const { MessageEmbed, CommandInteraction } = require("discord.js")
const ProfileDB = require("../../Structures/Schemas/Economy/ProfileDB");

module.exports ={
    name: "withdraw",
    description: "Withdraw money from your bank.",
    permission: "SEND_MESSAGES",
    options: [
        { 
            name: "amount", 
            description: "Amount to deposit.", 
            type: "NUMBER",
            required: true,
        },
    ],
    async execute(interaction) {
        const Amount = interaction.options.getNumber("amount");
        if(Amount % 1 != 0 || Amount <= 0) return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription("> Amount must be a number.")]})
        let Profile = await ProfileDB.findOne({
            GuildID: interaction.guild.id,
            UserID: interaction.member.id,
        });
        try {
            if(Amount > Profile.Bank) return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription("> You do not have enough money to withdraw.")]})
            await ProfileDB.findOneAndUpdate(
                {
                    GuildID: interaction.guild.id,
                    UserID: interaction.member.id,
                },
                {
                    $inc: {
                        Wallet: Amount,
                        Bank: -Amount,
                    },
                }
            )
            interaction.reply({embeds: [new MessageEmbed().setColor("#1ad4a8").setDescription(`> You have withdrawed \`£${Amount}\``)]})
        } catch (err) {
            console.log(err);
        }
    },
};