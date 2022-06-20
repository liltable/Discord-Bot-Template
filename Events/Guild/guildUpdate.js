const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "guildUpdate",
  
  async execute(oldGuild, newGuild, client) {
    const Response = new MessageEmbed()
    .setTitle("Server Updated!")
    .setTimestamp();
    const LogChannel = client.channels.cache.get(process.env.logchannel);

    if(oldGuild.name !== newGuild.name) {
      Response.addField("**――――――――――**", `> **Old Name**: ${oldGuild.name}\n > **New Name**: ${newGuild.name}`);
      
    } else if(oldGuild.icon !== newGuild.icon) {
      Response.addField("**――――――――――**", `> **Old Icon**: https://cdn.discordapp.com/icons/${oldGuild.id}/${oldGuild.icon}.png\n > **New Icon:** https://cdn.discordapp.com/icons/${newGuild.id}/${newGuild.icon}.png`);
      
    } else if(oldGuild.features !== newGuild.features) {
      const oldGuildFeatures = oldGuild.features
        .map(f => f)
        .join("\n >")
        .replace("ANIMATEDBANNER", "✅ Unlocked Animated Banner")
      .replace("ANIMATED_ICON", "✅ Unlocked Animated Icon")
      .replace("COMMERCE", "✅ Unlocked Server Store")
      .replace("FEATURABLE", "✅ Unlocked Server Featuring")
      .replace("DISCOVERABLE", "✅ Unlocked Server Discovery")
      .replace("INVITE_SPLASH", "✅ Unlocked Server Invite Banner")
      .replace("LINKED_TO_HUB", "✅ Server Listed in Student Hub")
      .replace("MEMBER_VERIFICATION_GATE_ENABLED", "✅ Membership Screening Enabled")
      .replace("MONETIZATION_ENABLED", "✅ Unlocked Monetization")
      .replace("MORE_STICKERS", "✅ Unlocked Increased Sticker Count")
      .replace("NEWS", "✅ Access to Create News Channels")
      .replace("PARTNERED", "✅ Server Partnered with Discord")
      .replace("PREVIEW_ENABLED", "✅ Server Previewable")
      .replace("PRIVATE_THREADS", "✅ Access to Create Private Threads")
      .replace("ROLE_ICONS", "✅ Unlocked Custom Role Icons")
      .replace("VIP_REGIONS", "✅ Unlocked Max Bitrate for Voice Channels")
      .replace("VANITY_URL", "✅ Unlocked Custom Vanity URL")
      .replace("VERIFIED", "✅ Server Verified with Discord")
      .replace("WELCOME_SCREEN_ENABLED", "✅ Enabled Welcome Screen")
      .replace("TEXT_IN_VOICE_ENABLED", "✅ Enabled Text in Voice Channels")
      .replace("COMMUNITY", "✅ Enabled Community Mode")
      .replace("THREADS_ENABLED", "✅ Enabled Serverwide Threads")
      .replace("NEW_THREAD_PERMISSIONS", `✅ Access to Create Threads`);
      
      const newGuildFeatures = newGuild.features
        .map(f => f)
        .join("\n > ")
        .replace("ANIMATEDBANNER", "✅ Unlocked Animated Banner")
      .replace("ANIMATED_ICON", "✅ Unlocked Animated Icon")
      .replace("COMMERCE", "✅ Unlocked Server Store")
      .replace("FEATURABLE", "✅ Unlocked Server Featuring")
      .replace("DISCOVERABLE", "✅ Unlocked Server Discovery")
      .replace("INVITE_SPLASH", "✅ Unlocked Server Invite Banner")
      .replace("LINKED_TO_HUB", "✅ Server Listed in Student Hub")
      .replace("MEMBER_VERIFICATION_GATE_ENABLED", "✅ Membership Screening Enabled")
      .replace("MONETIZATION_ENABLED", "✅ Unlocked Monetization")
      .replace("MORE_STICKERS", "✅ Unlocked Increased Sticker Count")
      .replace("NEWS", "✅ Access to Create News Channels")
      .replace("PARTNERED", "✅ Server Partnered with Discord")
      .replace("PREVIEW_ENABLED", "✅ Server Previewable")
      .replace("PRIVATE_THREADS", "✅ Access to Create Private Threads")
      .replace("ROLE_ICONS", "✅ Unlocked Custom Role Icons")
      .replace("VIP_REGIONS", "✅ Unlocked Max Bitrate for Voice Channels")
      .replace("VANITY_URL", "✅ Unlocked Custom Vanity URL")
      .replace("VERIFIED", "✅ Server Verified with Discord")
      .replace("WELCOME_SCREEN_ENABLED", "✅ Enabled Welcome Screen")
        .replace("TEXT_IN_VOICE_ENABLED", "✅ Enabled Text in Voice Channels")
      .replace("COMMUNITY", "✅ Enabled Community Mode")
      .replace("THREADS_ENABLED", "✅ Enabled Serverwide Threads")
      .replace("NEW_THREAD_PERMISSIONS", `✅ Access to Create Threads`);
      
      Response.addField("**――――――――――**", `> **Old Features:** \n > ${oldGuildFeatures}\n > **New Features:** > \n${newGuildFeatures}`)
      
    } else if(oldGuild.splash !== newGuild.splash) {
     Response.addField("**――――――――――**", `**Old Splash Banner:**\n https://cdn.discordapp.com/splashes/${oldGuild.id}/${oldGuild.splash}.png\n **New Splash Banner**\n https://cdn.discordapp.com/splases/${newGuild.id}/${newGuild.splash}.png`);
      
    } else if(oldGuild.banner !== newGuild.banner) {
      Response.addField("**――――――――――**", `> **Old Server Banner**\n > https://cdn.discordapp.com/banners/${oldGuild.id}/${oldGuild.banner}.png\n >**New Server Banner**: \n > https://cdn.discordapp.com/banners/${newGuild.id}/${newGuild.banner}.png`);
      
    } else if(oldGuild.description !== newGuild.description) {
      Response.addField("**――――――――――**", `>**Old Server Description**: \n > ${oldGuild.description}\n > **New Server Description**\n > ${newGuild.description}`);
      
    } else if(oldGuild.verification_level !== newGuild.verifcation_level) {
      const ogvl = oldGuild.verification_level
      .replace("0", `> 🟢 No verification required.` )
      .replace("1", `> 🔵 Must have a verified email registered to Discord.`)
      .replace("2",  `> 🟡 Must be joined for at least 5 minutes.`)
      .replace("3", `> 🟠 Must be joined for at least 10 minutes.`)
      .replace("4", `> 🔴 Must have a verified phone number.`);
  
      const ngvl = newGuild.verification_level
      .replace("0", `> 🟢 No verification required.` )
      .replace("1", `> 🔵 Must have a verified email registered to Discord.`)
      .replace("2",  `> 🟡 Must be joined for at least 5 minutes.`)
      .replace("3", `> 🟠 Must be joined for at least 10 minutes.`)
      .replace("4", `> 🔴 Must have a verified phone number.`);

      Response.addField("**――――――――――**", `> **Old Requirements**\n > ${ogvl}\n > **New Requirements**\n > ${ngvl}`)
      
    } else if(oldGuild.vanityURLCode !== newGuild.vanityURLCode) {
      Response.addField("**――――――――――**", `> **Old Vanity URL**\n > discord.gg/${oldGuild.vanityURLCode}\n > **New Vanity URL\n > discord.gg/${newGuild.vanityURLCode}**`)
      
    } else if(oldGuild.nsfwLevel !== newGuild.nsfwLevel) {
      const ognl = oldGuild.nsfwLevel
      .replace("0", `🔵 Default Level`)
      .replace("1", `🔴 Explicit`)
      .replace("2", `🟢 Safe`)
      .replace("3", `🟠 Age Restricted`);
      const ngnl = newGuild.nsfwLevel
      .replace("0", `🔵 Default Level`)
      .replace("1", `🔴 Explicit`)
      .replace("2", `🟢 Safe`)
      .replace("3", `🟠 Age Restricted`);

      Response.addField("NSFW Level Updated", `> **Old Level**\n > ${ognl}\n > **New Level**\n > ${ngnl}`);
      
    } else if(oldGuild.discoverySplash !== newGuild.discoverySplash) {
      Response.addField("**――――――――――**", `> **Old Discovery Banner**\n > https://discordapp.com/discovery-splashes/${oldGuild.id}/${oldGuild.discoverySplash}.png\n > **New Discovery Banner**\n > https://cdn.discordapp.com/discovery-splashes/${newGuild.id}/${newGuild.discoverySplash}.png`);
      
    } else if(oldGuild.explicitContentFilter !== newGuild.explicitContentFilter) {
      const ogef = oldGuild.explicitContentFilter
      .replace("0", `🔴 Filter Disabled`)
      .replace("1", `🟠 Enabled for Members w/o Roles`)
      .replace("2", `🟢 Enabled for All Members`);
      const ngef = newGuild.explicitContentFilter
      .replace("0", `🔴 Filter Disabled`)
      .replace("1", `🟠 Enabled for Members w/o Roles`)
      .replace("2", `🟢 Enabled for All Members`);

      Response.addField("**――――――――――**", `> **Old Filter Setting**\n > ${ogef}\n > **New Filter Setting**\n > ${ngef}`);
      
    } else if(oldGuild.mfaLevel !== newGuild.mfaLevel) {
      const ogml = oldGuild.mfaLevel
      .replace("0", `🔴 2FA not required for mod actions.`)
      .replace("1", `🟢 2FA required for mod actions.`)
      const ngml = newGuild.mfaLevel
      .replace("0", `🔴 2FA not required for mod actions.`)
      .replace("1", `🟢 2FA required for mod actions.`);

      Response.addField("**――――――――――**", `> **Old 2FA Settings**\n > ${ogml}\n > **New 2FA Settings**\n > ${ngml}`).setFooter("2FA stands for 2-Factor Authentication. Some servers require your Discord account to have this enabled in order to apply for staff.");
      
    } else if(oldGuild.ownerId !== newGuild.ownerId) {
      const oo = `<@${oldGuild.ownerId}>`;
      const no = `<@${newGuild.ownerId}>`;

      Response.addField("**――――――――――**", `> **Old Owner**: > ${oo}\n > ID ${oldGuild.ownerId}\n **New Owner** > ${no}\n > ID: ${newGuild.ownerId}`);
      
    } else if(oldGuild.rulesChannelId !== newGuild.rulesChannelId) {
      const ogrc = `<#${oldGuild.rulesChannelId || "None"}>`;
      const ngrc = `<#${newGuilld.rulesChannelId || "None"}>`;

      Response.addField("**――――――――――**", `> **Old Rules Channel**\n > ${ogrc}\n > **New Rules Channel**\n > ${ngrc}`);
      
    } else if(oldGuild.systemChannelId !== newGuild.systemChannelid) {
      const ogsc = `<#${oldGuild.systemChannelId || "None"}>`;
      const ngsc = `<#${newGuild.systemChannelId || "None"}>`;

      Response.addField("**――――――――――**", `> **Old Channel**\n > ${ogsc}\n > **New Channel**\n > ${ngsc}`);
      
    }
    
  
    return LogChannel.send({embeds: [Response]}).catch((error) => {
      console.log("VOIDED || Log channel not found.")
    });
  }
}