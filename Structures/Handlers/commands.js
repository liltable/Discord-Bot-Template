const { Perms } = require('../Validation/permissions');
const { Client } = require("discord.js");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");

/**
 * 
 * @param {Client} client 
 */

module.exports = async (client) => {
    const table = new Ascii("Commands")

    CommandsArray = [];

    (await PG(`${process.cwd()}/Commands/*/*.js`)).map(async (file) => {
        const command = require(file);

        if(!command.name)
        return table.addRow(file.split("/")[7], "Failed.", "Missing a name.")

        if(!command.type && !command.description)
        return table.addRow(command.name, "Failed.", "Missing a description.")

        if(command.permission) {
            if(Perms.includes(command.permission))
            command.defaultPermission = false;
            else 
            return table.addRow(command.name, "Failed.", "Invalid permission.")
        }

        client.commands.set(command.name, command);
        CommandsArray.push(command);

        await table.addRow(command.name, "Successful.");
    });

    console.log(table.toString());

    // PERMS CHECK //

      client.on('ready', async () => {
        
        const mainGuild = client.guilds.cache.get("985630452570271774");
        
        mainGuild.commands.set(CommandsArray);
    });
}