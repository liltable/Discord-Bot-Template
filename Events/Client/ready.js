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
    console.log(`VOIDED || Started client link at ${client.user.tag}. Logged in.`);

    client.user.setActivity("all voided things...", {
      type: "WATCHING"
    });

    if(!database) return console.log("VOIDED || No database found.");
    
    mongoose.connect(database, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      console.log("VOIDED || Storage link created.")
    }).catch((err) => {
      console.log(err)
    });
  }
}