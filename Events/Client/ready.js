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
    console.log(`VOIDED || Initialized at ${client.user.tag}.`);

    client.user.setActivity("to the void...", {
      type: "LISTENING"
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
