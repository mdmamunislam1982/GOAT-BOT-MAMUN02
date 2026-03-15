const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "roast",
    aliases: ["burn"],
    version: "2.3",
    author: "nexo_here",
    countDown: 3,
    role: 0,
    description: "Send a roast image",
    category: "fun"
  },

  onStart: async function ({ api, event }) {
    try {

      const mention = Object.keys(event.mentions || {});
      const uid = mention[0] || event.senderID;

      const cache = path.join(__dirname, "cache");
      if (!fs.existsSync(cache)) fs.mkdirSync(cache, { recursive: true });

      const img = path.join(cache, `roast_${Date.now()}.jpg`);

      const res = await axios({
        url: `https://simsimi-api-tjb1.onrender.com}`,
        method: "GET",
        responseType: "stream"
      });

      const writer = fs.createWriteStream(img);
      res.data.pipe(writer);

      writer.on("finish", () => {
        api.sendMessage(
          {
            body: "🔥 Roast incoming 😂",
            attachment: fs.createReadStream(img)
          },
          event.threadID,
          () => fs.unlinkSync(img),
          event.messageID
        );
      });

    } catch (err) {
      console.log(err);
      api.sendMessage("❌ Roast image generate করতে সমস্যা হয়েছে!", event.threadID);
    }
  }
};
