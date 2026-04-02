const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");

module.exports = {
  config: {
    name: "goru",
    version: "2.0",
    author: "Mamun",
    countDown: 5,
    role: 0,
    shortDescription: "Goru troll",
    longDescription: "Mention করলে গরুর ছবি পাঠাবে",
    category: "fun",
    guide: "{pn} @mention"
  },

  onStart: async function ({ api, event }) {
    try {
      const mention = Object.keys(event.mentions)[0];
      if (!mention)
        return api.sendMessage("⚠️ একজনকে মেনশন করো!", event.threadID);

      const name = event.mentions[mention].replace("@", "");

      const cacheFolder = path.join(__dirname, "cache");
      if (!fs.existsSync(cacheFolder)) {
        fs.mkdirSync(cacheFolder);
      }

      const filePath = path.join(cacheFolder, `goru_${Date.now()}.jpg`);

      // Stable random cow image API (429 error হবে না)
      const url = "https://source.unsplash.com/600x400/?cow";

      const response = await axios({
        url,
        method: "GET",
        responseType: "stream"
      });

      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);

      writer.on("finish", () => {
        api.sendMessage({
          body: `🤣🐮 @${name} একদম আসল গরু হয়ে গেছে!`,
          mentions: [{
            id: mention,
            tag: `@${name}`
          }],
          attachment: fs.createReadStream(filePath)
        }, event.threadID, () => {
          fs.unlinkSync(filePath); // send শেষে delete
        });
      });

      writer.on("error", () => {
        api.sendMessage("❌ ছবি আনতে সমস্যা হয়েছে!", event.threadID);
      });

    } catch (err) {
      console.log(err);
      api.sendMessage("⚠️ পরে আবার try করো!", event.threadID);
    }
  }
};
