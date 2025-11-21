import { readFileSync } from "fs";
import { MongoClient } from "mongodb";
import path from "path";

const uri =
  "mongodb+srv://Morkosabanoub:689IsVMms3e6V0dK@cluster0.yh0mmvo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    const db = client.db("translationsDB");
    const collection = db.collection("translations");

    // ✅ اللغات + الجنرال
    const languages = ["ar", "en", "ua", "general"];

    for (const lang of languages) {
      const filePath = path.join("public", "local", lang, "translation.json");
      const data = JSON.parse(readFileSync(filePath, "utf8"));

      await collection.deleteMany({ language: lang });
      await collection.insertOne({ language: lang, data });

      console.log(`${lang} uploaded successfully!`);
    }

    console.log("All translations uploaded including general!");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main();
