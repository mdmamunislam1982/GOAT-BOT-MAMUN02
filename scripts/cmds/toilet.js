const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "toilet",
    aliases: ["flush", "wc"],
    version: "5.0",
    author: "Dark Image Dev",
    countDown: 2,
    role: 0,
    shortDescription: "Toilet with image 🚽🖼️",
    category: "fun",
    guide: "{pn} @mention"
  },

  onStart: async function ({ api, event, args }) {

    const target = Object.keys(event.mentions)[0];
    const name = target ? event.mentions[target] : (args.join(" ") || "Unknown");

    const msgList = [
      `🚽💩 ${name} toilet e dhukse 🤣`,
      `💀 ${name} ke direct toilet e pathano holo 😂`,
      `🧻 ${name} ekhon toilet e busy 😈`,
      `🚨 ${name} emergency toilet situation!`
    ];

    const msg = msgList[Math.floor(Math.random() * msgList.length)];

    // 🔥 random toilet image URL
    const imgUrl = "https://i.imgur.com/Hv1Blhb.jpeg";

    const imgPath = path.join(__dirname, "cache", "toilet.jpg");

    const response = await axios.get(imgUrl, { responseType: "arraybuffer" });
    fs.writeFileSync(imgPath, Buffer.from(response.data, "utf-8"));

    return api.sendMessage({
      body: msg,
      attachment: fs.createReadStream(imgPath)
    }, event.threadID, () => fs.unlinkSync(imgPath), event.messageID);
  }
};
