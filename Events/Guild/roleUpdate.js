const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "roleUpdate",

  async execute(oldRole, newRole, client) {
    const LogChannel = client.channels.cache.get(process.env.logchannel);
    const Response = new MessageEmbed()
    .setColor(newRole.hexColor)
    .setTitle(`Role Updated`)
    .addField("Role:", `${newRole}`);

    if(oldRole.name !== newRole.name) {
      Response.addField("**――――――――――**", `> **Old Name:** ${oldRole.name}\n > **New Name:** ${newRole.name}`)
      
    } else if(oldRole.hoist != newRole.hoist) {
      
      if(oldRole.hoist == true) {
        Response.addField("**――――――――――**", `> **Old Display Settings:** ✅ Role displayed separately.\n > **New Display Settings:** ❌ Role not displayed seperately.`);
        
      } else {
        Response.addField("**――――――――――**", `> **Old Display Settings:** ❌ Role not displayed seperately.\n > **New Display Settings:** ✅ Role displayed separately.`);
        
      }

    } else if(oldRole.color !== newRole.color) {
      const orhc = oldRole.hexColor;
      const nrhc = newRole.hexColor;

      Response.addField("**――――――――――**", `> **Old Color:** ${orhc}\n > **New Color:** ${nrhc}`);
      
    } else if(oldRole.permissions !== newRole.permissions) {
      const orp = oldRole.permissions.toArray().map(p => p).join("\n> ")
      .replace("ADD_REACTIONS", `✅ Can add message reactions.`)
      .replace("CREATE_INSTANT_INVITE", `✅ Can create server invites.`)
      .replace("VIEW_CHANNEL", `✅ Can view channels.`)
      .replace("SEND_MESSAGES", `✅ Can send messages.`)
      .replace("EMBED_LINKS", `✅ Can send links with embeds.`)
      .replace("ATTACH_FILES", `✅ Can send attachments.`)
      .replace("READ_MESSAGE_HISTORY", `✅ Can read channel message history.`)
      .replace("USE_EXTERNAL_EMOJIS", `✅ Can use Nitro emojis.`)
      .replace("CONNECT", `✅ Can join voice channels.`)
      .replace("SPEAK", `✅ Can speak in voice channels.`)
      .replace("USE_VAD", `✅ Can use voice activity detection in voice channels.`)
      .replace("CHANGE_NICKNAME", `✅ Can change own server nickname.`)
      .replace("USE_APPLICATION_COMMANDS", `✅ Can use slash commands.`)
      .replace("REQUEST_TO_SPEAK", `✅ Can request to speak in stages.`)
      .replace("USE_PUBLIC_THREADS", `✅ Can use public threads.`)
      .replace("CREATE_PUBLIC_THREADS", `✅ Can create public threads.`)
      .replace("USE_PRIVATE_THREADS", `✅ Can use privated threads.`)
      .replace("CREATE_PRIVATE_THREADS", `✅ Can create privated threads.`)
      .replace("ADMINISTRATOR", `✅ Can use admin commands and utilities.`)
      .replace("BAN_MEMBERS", `✅ Can ban members.`)
      .replace("DEAFEN_MEMBERS", `✅ Can deafen members.`)
      .replace("KICK_MEMBERS", `✅ Can kick members.`)
      .replace("MANAGE_CHANNELS", `✅ Can manage and edit channels.`)
      .replace("MANAGE_EMOJIS_AND_STICKERS", `✅ Can manage and edit server emojis/stickers.`)
      .replace("MANAGE_EVENTS", `✅ Can create, edit, and manage server events.`)
      .replace("MANAGE_GUILD", `✅ Can edit and manage the server.`)
      .replace("MANAGE_MEMBERS", `✅ Can punish and manage members.`)
      .replace("MANAGE_NICKNAMES", `✅ Can change and reset mamber nicknames.`)
      .replace("MANAGE_ROLES", `✅ Can create, delete, and edit roles.`)
      .replace("MANAGE_THREADS", `✅ Can manage created threads.`)
      .replace("MANAGE_WEBHOOKS", `✅ Can create, delete, and edit server integrations (webhooks).`)
      .replace("MENTION_EVERYONE", `✅ Can mention everyone.`)
      .replace("MODERATE_MEMBERS", `✅ Can punish members.`)
      .replace("MOVE_MEMBERS", `✅ Can move members in voice channels.`)
      .replace("MUTE_MEMBERS", `✅ Can server mute members in voice channels.`)
      .replace("PRIORITY_SPEAKER", `✅ Has prioirty speaker in voice channels.`)
      .replace("STREAM", `✅ Can stream to voice channels.`)
      .replace("VIEW_AUDIT_LOG", `✅ Can view the server audit log.`)
      .replace("SEND_MESSAGES_IN_THREADS", `✅ Can send messages in threads.`);
      
      const nrp = newRole.permissions.toArray().map(p => p).join("\n> ")
      .replace("ADD_REACTIONS", `✅ Can add message reactions.`)
      .replace("CREATE_INSTANT_INVITE", `✅ Can create server invites.`)
      .replace("VIEW_CHANNEL", `✅ Can view channels.`)
      .replace("SEND_MESSAGES", `✅ Can send messages.`)
      .replace("EMBED_LINKS", `✅ Can send links with embeds.`)
      .replace("ATTACH_FILES", `✅ Can send attachments.`)
      .replace("READ_MESSAGE_HISTORY", `✅ Can read channel message history.`)
      .replace("USE_EXTERNAL_EMOJIS", `✅ Can use Nitro emojis.`)
      .replace("CONNECT", `✅ Can join voice channels.`)
      .replace("SPEAK", `✅ Can speak in voice channels.`)
      .replace("USE_VAD", `✅ Can use voice activity detection in voice channels.`)
      .replace("CHANGE_NICKNAME", `✅ Can change own server nickname.`)
      .replace("USE_APPLICATION_COMMANDS", `✅ Can use slash commands.`)
      .replace("REQUEST_TO_SPEAK", `✅ Can request to speak in stages.`)
      .replace("USE_PUBLIC_THREADS", `✅ Can use public threads.`)
      .replace("CREATE_PUBLIC_THREADS", `✅ Can create public threads.`)
      .replace("USE_PRIVATE_THREADS", `✅ Can use privated threads.`)
      .replace("CREATE_PRIVATE_THREADS", `✅ Can create privated threads.`)
      .replace("ADMINISTRATOR", `✅ Can use admin commands and utilities.`)
      .replace("BAN_MEMBERS", `✅ Can ban members.`)
      .replace("DEAFEN_MEMBERS", `✅ Can deafen members.`)
      .replace("KICK_MEMBERS", `✅ Can kick members.`)
      .replace("MANAGE_CHANNELS", `✅ Can manage and edit channels.`)
      .replace("MANAGE_EMOJIS_AND_STICKERS", `✅ Can manage and edit server emojis/stickers.`)
      .replace("MANAGE_EVENTS", `✅ Can create, edit, and manage server events.`)
      .replace("MANAGE_GUILD", `✅ Can edit and manage the server.`)
      .replace("MANAGE_MEMBERS", `✅ Can punish and manage members.`)
      .replace("MANAGE_NICKNAMES", `✅ Can change and reset mamber nicknames.`)
      .replace("MANAGE_ROLES", `✅ Can create, delete, and edit roles.`)
      .replace("MANAGE_THREADS", `✅ Can manage created threads.`)
      .replace("MANAGE_WEBHOOKS", `✅ Can create, delete, and edit server integrations (webhooks).`)
      .replace("MENTION_EVERYONE", `✅ Can mention everyone.`)
      .replace("MODERATE_MEMBERS", `✅ Can punish members.`)
      .replace("MOVE_MEMBERS", `✅ Can move members in voice channels.`)
      .replace("MUTE_MEMBERS", `✅ Can server mute members in voice channels.`)
      .replace("PRIORITY_SPEAKER", `✅ Has prioirty speaker in voice channels.`)
      .replace("STREAM", `✅ Can stream to voice channels.`)
      .replace("VIEW_AUDIT_LOG", `✅ Can view the server audit log.`)
      .replace("SEND_MESSAGES_IN_THREADS", `✅ Can send messages in threads.`);

     Response.addField("Old Role Permissions", `> ${orp}`);
      Response.addField("New Role Permissions", `> ${nrp}`);

      
    }

    LogChannel.send({embeds: [Response]}).catch((error) => {
      console.log("VOIDED || Log channel not found.")
    });
  }
}