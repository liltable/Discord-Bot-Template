const { MessageEmbed, CommandInteraction } = require("discord.js")
const ProfileDB = require("../../Structures/Schemas/Economy/ProfileDB");

module.exports ={
    name: "transfer",
    description: "Transfer money from your bank to another users bank.",
    permission: "SEND_MESSAGES",
    options: [
        { 
            name: "amount", 
            description: "Amount to transfer.", 
            type: "NUMBER",
            required: true,
        },
        
    ],
    async execute(interaction) {
        const Amount = interaction.options.getNumber("amount");
        const Target = interaction.options.getMember("user");
        if(Amount % 1 != 0 || Amount <= 0) return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription("> Amount must be a number.")]})
        let Profile = await ProfileDB.findOne({
            GuildID: interaction.guild.id,
            UserID: interaction.member.id,
        });
        try {
            if(Amount > Profile.Bank) return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription("> You do not have enough money to withdraw.")]});
            //if(interaction.member.id = Target.id) return interaction.reply({embeds: [new MessageEmbed().setColor("RED").setDescription("> You cannot send money to yourself.")]});
            await ProfileDB.findOneAndUpdate(
                {
                    GuildID: interaction.guild.id,
                    UserID: interaction.member.id,
                },
                {
                    $inc: {
                        Bank: -Amount,
                    },
                }
            )
            await ProfileDB.findOneAndUpdate(
                {
                    GuildID: interaction.guild.id,
                    UserID: Target.id,
                },
                {
                    $inc: {
                        Bank: Amount,
                    },
                }
            )
            interaction.reply({embeds: [new MessageEmbed().setColor("#1ad4a8").setDescription(`> You have send ${Target} \`£${Amount}\``)]})
        } catch (err) {
            console.log(err);
        }
    },
};