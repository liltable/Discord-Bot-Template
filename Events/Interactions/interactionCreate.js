const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

/**
 * @param {CommandInteraction} interaction
 * @param {Client} client
 */
module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        if(interaction.isCommand() || interaction.isContextMenu()) {
            const command = client.commands.get(interaction.commandName);
            if(!command) return interaction.reply({embeds: [
                new MessageEmbed()
                .setColor("RED")
                .setDescription("> An error occurred whilst running this command. Please contact support if this issue persists.")
            ]}) && client.commands.delete(interaction.commandName);

          if (command.permission && !interaction.member.permissions.has(command.permission)) {
    return interaction.reply({embeds: [
      new MessageEmbed()
      .setColor("RED")
      .setDescription("> :no_entry_sign: You don't have the permissions necessary for this command!")
    ]})
}
            command.execute(interaction, client)
        }
    }
}