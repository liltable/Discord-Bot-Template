module.exports = async (client, PG, Ascii) => {
  const Table = new Ascii("VOIDED || Modals");
  const modalsFolder = await PG(`${process.cwd()}/Modals/*/*.js`);
  
  modalsFolder.map(async (file) => {
    let modalsFile = require(file);
    if(!modalsFile) Table.addRow("BLANK", "🔶 No modals to load.");
    if(!modalsFile.id) Table.addRow("VOID", "⛔ Invalid ID / ID not provided.");

    client.modals.set(modalsFile.id, modalsFile);
    Table.addRow(modalsFile.id, `🟢 Loaded.`)

    console.log(Table.toString());
    
  });  
}