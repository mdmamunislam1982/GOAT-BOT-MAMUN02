‎const fs = require("fs-extra");
‎const axios = require("axios");
‎const path = require("path");
‎
‎module.exports = {
‎  config: {
‎    name: "goru",
‎    version: "6.0",
‎    author: "Mamun",
‎    countDown: 5,
‎    role: 0,
‎    shortDescription: "Goru troll API",
‎    category: "fun",
‎    guide: "{pn} @mention"
‎  },
‎
‎  onStart: async function ({ api, event }) {
‎    try {
‎
‎      const mentions = Object.keys(event.mentions);
‎      if (mentions.length === 0) {
‎        return api.sendMessage("⚠️ একজনকে মেনশন করো!", event.threadID, event.messageID);
‎      }
‎
‎      const uid = mentions[0];
‎      const name = event.mentions[uid].replace("@", "");
‎
‎      // 😈 Funny text
‎      const texts = [
‎        `🤣🐮 @${name} এখন মাঠে ঘাস খাচ্ছে!`,
‎        `🐮😂 @${name} আজকে দুধ দেবে মনে হয়!`,
‎        `🤣🐄 @${name} একদম খাঁটি গরু!`,
‎        `🐮🔥 @${name} গরুর Boss level!`,
‎        `😂🐄 @${name} VIP গরু হয়ে গেছে!`,
‎        `🐮😏 @${name} আজকে বাজারে বিক্রি হবে!`
‎      ];
‎
‎      const randomText = texts[Math.floor(Math.random() * texts.length)];
‎
‎      const filePath = path.join(__dirname, "cache", `goru_${Date.now()}.jpg`);
‎
‎      // 🐮 REAL COW API LINK
‎      const apiUrl = `https://placebear.com/500/400?${Date.now()}`;
‎
‎      const response = await axios({
‎        url: apiUrl,
‎        method: "GET",
‎        responseType: "arraybuffer"
‎      });
‎
‎      fs.writeFileSync(filePath, response.data);
‎
‎      return api.sendMessage({
‎        body: randomText,
‎        mentions: [{
‎          id: uid,
‎          tag: `@${name}`
‎        }],
‎        attachment: fs.createReadStream(filePath)
‎      }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
‎
‎    } catch (err) {
‎      console.log(err);
‎      return api.sendMessage("❌ গরু পালাইছে 🐄💨 আবার try করো!", event.threadID, event.messageID);
‎    }
‎  }
‎};
‎
