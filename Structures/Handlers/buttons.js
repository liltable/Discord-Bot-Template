module.exports = async (client, PG, Ascii) => {
  const Table = new Ascii("VOIDED || Buttons");
  const buttonsFolder = await PG(`${process.cwd()}/Buttons/*/*.js`);

  buttonsFolder.map(async (file) => {
    let buttonFile = require(file);
    if(!buttonFile) return Table.addRow("BLANK", "🔶 No buttons to load.")
    if(!buttonFile.id) return;

    client.buttons.set(buttonFile.id, buttonFile);
    Table.addRow(buttonFile.id, "🟢 Loaded.")
  });

  console.log(Table.toString());
}
