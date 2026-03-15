const fs = require("fs");
const axios = require("axios");
const path = require("path");

module.exports = {
  config: {
    name: "goru",
    version: "1.1",
    author: "Mamun",
    countDown: 5,
    role: 0,
    shortDescription: "Goru troll",
    longDescription: "Mention করলে গরুর ছবি পাঠাবে",
    category: "fun",
    guide: "{pn} @mention"
  },

  onStart: async function ({ api, event }) {

    const mention = Object.keys(event.mentions)[0];
    if (!mention)
      return api.sendMessage("⚠️ একজনকে মেনশন করো!", event.threadID);

    const name = event.mentions[mention].replace("@", "");

    const imgPath = path.join(__dirname, "cache", "goru.jpg");

    const response = await axios({
      url: "https://i.imgur.com/FmGoTmo.jpeg",
      method: "GET",
      responseType: "stream"
    });

    const writer = fs.createWriteStream(imgPath);
    response.data.pipe(writer);

    writer.on("finish", () => {
      api.sendMessage({
        body: `🤣🐮 @${name} একদম আসল গরু হয়ে গেছে বিদেশী গরু! ✨`,
        mentions: [{
          id: mention,
          tag: `@${name}`
        }],
        attachment: fs.createReadStream(imgPath)
      }, event.threadID);
    });
  }
};
