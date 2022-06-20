const { Client } = require("discord.js");
const mongoose = require("mongoose");
const database = process.env.database;

module.exports = {
  name: "ready",
  once: true,

  /**
  * @param {Client} client
*/

  async execute(client) {
    console.log(`Started client link at ${client.user.tag}. Logged in.`);

    client.user.setActivity("all voided things...", {
      type: "WATCHING"
    });

    if(!database) return console.log("No database found.");
    
    mongoose.connect(database, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      console.log("Storage link created.")
    }).catch((err) => {
      console.log(err)
    });
  }
}
