const { Client, Collection } = require("discord.js");
const client = new Client({intents: 32767});
const discordmodals = require("discord-modals");
discordmodals(client);
const { keepalive } = require("./keepalive.js");

const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");

["events", "commands", "buttons", "modals"].forEach(handler => {
  require(`./Structures/Handlers/${handler}`)(client, PG, Ascii)
});

client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
client.filters = new Collection();
client.filterLog = new Collection();
client.voiceGenerator = new Collection();

module.exports = client;


client.login(process.env.token2).catch((error) => {
  console.log("VOIDED || An error has occured. Couldn't sign in.")
});
