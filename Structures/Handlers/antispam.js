const AntiSpam = require("discord-anti-spam");
const DB = require("../Schemas/antispam.js");

module.exports = (client) => {
    client.on("messageCreate", (message) => {
      if(!message.guild) return;
      if(message.author.bot) return;
      if(message.author.id === message.guild.ownerId) return;
      if(message.author.id === client.ownerId) return;
      
      DB.findOne({GuildID: message.guild.id}, async (err, data) => {
        if(err) throw err;
        if(!data) return;
        if(data.Enabled == false) return;
        if(message.guild.id !== data.GuildID) return;

        const antispam = new AntiSpam({
          kickEnabled: false,
          muteEnabled: false,
          banEnabled: false,
          removeMessages: data.RemoveMessages,
          warnThreshold: data.WarnThreshold,
          maxInterval: data.maxInterval,
          maxDuplicatesWarn: data.MaxDuplicatesWarning,
          warnMessage: data.WarnMessage,
          modLogsEnabled: true,
          ignoredMembers: data.IgnoredMembers,
          ignoredPermissions: data.IgnoredPermissions,
          modLogsChannelName: data.ModLogsChannelName,
          ignoreBots: true,
        });
        antispam.message(messageCreate);
      })
    })
  
}