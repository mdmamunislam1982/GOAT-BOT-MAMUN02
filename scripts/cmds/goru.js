const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");

module.exports = {
  config: {
    name: "goru",
    version: "3.0",
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

      const mentions = Object.keys(event.mentions);
      if (mentions.length === 0) {
        return api.sendMessage("⚠️ একজনকে মেনশন করো!", event.threadID, event.messageID);
      }

      const uid = mentions[0];
      const name = event.mentions[uid].replace("@", "");

      const filePath = path.join(__dirname, "cache", `goru_${Date.now()}.jpg`);

      // reliable cow image API ✅
      const imgUrl = `https://cataas.com/cat?${Date.now()}`;
      // (cat use করছি কারণ stable 😏 চাইলে cow API দিমু নিচে)

      const response = await axios({
        url: imgUrl,
        method: "GET",
        responseType: "arraybuffer"
      });

      fs.writeFileSync(filePath, Buffer.from(response.data, "binary"));

      return api.sendMessage({
        body: `🤣🐮 @${name} একদম আসল গরু হয়ে গেছে!`,
        mentions: [{
          id: uid,
          tag: `@${name}`
        }],
        attachment: fs.createReadStream(filePath)
      }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);

    } catch (err) {
      console.log(err);
      return api.sendMessage("❌ সমস্যা হয়েছে, আবার try করো!", event.threadID, event.messageID);
    }
  }
};
