const AntiSpam = require("discord-anti-spam");
const DB = require("../Schemas/antispam.js");

module.exports = (client) => {
  const LogChannel = client.channels.cache.get(process.env.logchannel);

  lw DB.findOne({
    GuildID: 
  })

  
}