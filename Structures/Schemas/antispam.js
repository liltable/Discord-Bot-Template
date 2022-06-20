const { model, Schema } = require("mongoose");
module.exports = model("Antispam Settings", new Schema({
  GuildID: String,
  Enabled: Boolean,
  WarnThreshold: String,
  MaxInterval: String,
  WarnMessage: String,
  MaxDuplicatesWarning: String,
  IgnoredPermissons: Array,
  IgnoredMembers: Array,
  RemoveMessages: Boolean,
  ModLogsChannelName: String
}));