const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildMemberUpdate",

  async execute(oldMember, newMember, client) {

    const LogChannel = client.channels.cache.get(process.env.logchannel);
    
    const Response = new MessageEmbed()
    .setColor("BLURPLE")
    .setTimestamp()
    .setTitle("Member Updated")
    .addField("Member:", `${newMember}`);

    if(oldMember.user.username !== newMember.user.username) {
      Response.addField("**――――――――――**", `> **Old Username:** ${oldMember.user.username}\n > **New Username:** ${newMember.user.username}`);
      
    } else if(oldMember.user.banner !== newMember.user.banner) {
      Response.addField("**――――――――――**", `> **Old Banner:** ${oldMember.user.bannerURL({dynamic: true})}\n > **New Banner:** ${newMember.user.bannerURL({dynamic: true})}`);
      
    } else if(oldMember.nickname !== newMember.nickname) {
      Response.addField("**――――――――――**", `> **Old Nickname:** ${oldMember.nickname}\n > **New Nickname:** ${newMember.nickname}`);
      
    } else if(oldMember.roles !== newMember.roles) {
      const omr = oldMember.roles.cache
      .map(r => r)
      .join("\n> ")
      .replace("@everyone", " " || "No roles found");
 
      const nmr = newMember.roles.cache
      .map(r => r)
      .join("\n> ")
      .replace("@everyone", " " || "No roles found");


      Response.addField("**――――――――――**", `**Old Roles List:**\n> ${omr}`);
      Response.addField("**――――――――――**", `**New Roles List:**\n> ${nmr}`);
    }

    return LogChannel.send({embeds: [Response]}).catch((error) => {
      console.log("VOIDED || Log channel not found.")
    });
  }
}