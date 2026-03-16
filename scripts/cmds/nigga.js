const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "nigga",
    aliases: ["roast", "burn"],
    version: "2.0",
    author: "nexo_here (edited by Mamun)",
    countDown: 3,
    role: 0,
    description: "Send a roast image using UID",
    category: "fun",
    guide: {
      en: "{pn} @mention\nOr use without mention to roast yourself"
    }
  },

  onStart: async function ({ api, event }) {
    try {

      const mention = Object.keys(event.mentions || {});
      const uid = mention.length > 0 ? mention[0] : event.senderID;

      const cachePath = path.join(__dirname, "cache");
      if (!fs.existsSync(cachePath)) {
        fs.mkdirSync(cachePath, { recursive: true });
      }

      const filePath = path.join(cachePath, `roast_${uid}.jpg`);

      const apiUrl = `https://betadash-api-swordslush-production.up.railway.app/nigga?userid=${uid}`;

      const res = await axios.get(apiUrl, {
        responseType: "arraybuffer"
      });

      fs.writeFileSync(filePath, res.data);

      api.sendMessage(
        {
          body: "😂 Look I found a nigga!",
          attachment: fs.createReadStream(filePath)
        },
        event.threadID,
        () => fs.unlinkSync(filePath),
        event.messageID
      );

    } catch (error) {
      console.log(error);
      api.sendMessage(
        "❌ Image generate করতে সমস্যা হয়েছে, পরে আবার চেষ্টা করো!",
        event.threadID,
        event.messageID
      );
    }
  }
};
