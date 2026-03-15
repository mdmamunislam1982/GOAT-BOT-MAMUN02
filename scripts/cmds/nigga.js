const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "roast",
    aliases: ["burn"],
    version: "2.0",
    author: "nexo_here (edited)",
    countDown: 3,
    role: 0,
    description: "Send a roast image using UID",
    category: "fun",
    guide: {
      en: "{pn} @mention\nOr use without mention to roast yourself."
    }
  },

  onStart: async function ({ api, event }) {
    try {

      const mention = Object.keys(event.mentions || {});
      const targetUID = mention.length > 0 ? mention[0] : event.senderID;

      const cacheFolder = path.join(__dirname, "cache");
      if (!fs.existsSync(cacheFolder)) {
        fs.mkdirSync(cacheFolder);
      }

      const filePath = path.join(cacheFolder, `roast_${targetUID}_${Date.now()}.jpg`);

      const url = `https://betadash-api-swordslush-production.up.railway.app/nigga?userid=${targetUID}`;

      const response = await axios({
        method: "GET",
        url: url,
        responseType: "arraybuffer"
      });

      fs.writeFileSync(filePath, Buffer.from(response.data));

      api.sendMessage(
        {
          body: "😂 Roast incoming!",
          attachment: fs.createReadStream(filePath)
        },
        event.threadID,
        () => fs.unlinkSync(filePath),
        event.messageID
      );

    } catch (error) {
      console.log(error);
      api.sendMessage(
        "❌ Image generate করতে সমস্যা হয়েছে। পরে আবার চেষ্টা করো।",
        event.threadID,
        event.messageID
      );
    }
  }
};
