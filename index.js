const { Client, Collection } = require("discord.js");
const client = new Client({intents: 32767});
const { keepalive } = require("./keepalive.js");



client.commands = new Collection();
client.filters = new Collection();
client.filterLog = new Collection();
client.voiceGenerator = new Collection();

module.exports = client;


require('./Structures/Handlers/anticrash')(client);
require('./Structures/Handlers/antispam')(client);
require('./Structures/Handlers/events')(client);
require('./Structures/Handlers/commands')(client);


client.login(process.env.token).catch((error) => {
  console.log("VOIDED || An error has occured. Couldn't sign in.")
});
