const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "toiletx",
    aliases: ["tx", "flushx"],
    version: "2.0",
    author: "V2 Fix Dev",
    countDown: 2,
    role: 0,
    shortDescription: "Toilet troll V2 🚽",
    longDescription: "Funny toilet command",
    category: "fun",
    guide: "{pn} @mention / text"
  },

  onStart: async function ({ api, event, args }) {

    try {
      const mention = Object.keys(event.mentions)[0];
      const name = mention 
        ? event.mentions[mention] 
        : (args.join(" ") || "User");

      const msgList = [
        `🚽 ${name} toilet e dhuke pore gese 🤣`,
        `💩 ${name} ekhon emergency mode e 😂`,
        `🧻 ${name} busy... disturb koro na 😈`,
        `🤣 ${name} ke direct flush kore deya hoise 🌊`,
        `💀 ${name} toilet system e atke gese 😂`
      ];

      const msg = msgList[Math.floor(Math.random() * msgList.length)];

      const imgPath = path.join(__dirname, "cache", "toilet.jpg");

      if (!fs.existsSync(imgPath)) {
        return api.sendMessage(msg + "\n\n⚠️ image nai!", event.threadID, event.messageID);
      }

      return api.sendMessage({
        body: msg,
        attachment: fs.createReadStream(imgPath)
      }, event.threadID, event.messageID);

    } catch (e) {
      return api.sendMessage("❌ Command error hoise!", event.threadID, event.messageID);
    }
  }
};
