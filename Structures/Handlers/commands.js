const { Perms } = require('../Validation/permissions');
const { Client } = require("discord.js");


/**
 * 
 * @param {Client} client 
 */

module.exports = async (client, PG, Ascii) => {
    const table = new Ascii("VOIDED || Commands")

    CommandsArray = [];

    (await PG(`${process.cwd()}/Commands/*/*.js`)).map(async (file) => {
        const command = require(file);

        if(!command.name)
        return table.addRow(file.split("/")[7], "🔴 Failed.", "Missing a name.")

        if(!command.type && !command.description)
        return table.addRow(command.name, "🔴 Failed.", "Missing a description.")

        if(command.permission) {
            if(Perms.includes(command.permission))
            command.defaultPermission = false;
            else 
            return table.addRow(command.name, "🔴 Failed.", "Invalid permission.")
        }

        client.commands.set(command.name, command);
        CommandsArray.push(command);

        await table.addRow(command.name, "🟢 Loaded.");
    });

    console.log(table.toString());

    // PERMS CHECK //

      client.on('ready', async () => {
        //Load commands for only servers that the bot's owner are in.
        client.guilds.cache.forEach(g => {
          
         let Owner = g.members.fetch(client.ownerId);
          if(!Owner) {
            g.commands.delete(CommandsArray);
            g.leave();
            console.log(`VOIDED || Owner not found. Left ${g.name}.`)
          } else {
            g.commands.set(CommandsArray);
            console.log(`VOIDED || Loaded commands for ${g.name}.`)
          }
          
    });
  });
}