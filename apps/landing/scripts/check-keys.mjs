import fs from "fs";
const files = fs.readdirSync("messages").filter(f => f.endsWith(".json"));
for (const f of files) {
  const d = JSON.parse(fs.readFileSync("messages/" + f, "utf8"));
  if (!(d.home && d.home.hero && d.home.hero.title)) console.log("MISSING hero.title:", f);
  if (!(d.home && d.home.demo && d.home.demo.title)) console.log("MISSING demo.title:", f);
}
console.log("Checked", files.length, "files");
