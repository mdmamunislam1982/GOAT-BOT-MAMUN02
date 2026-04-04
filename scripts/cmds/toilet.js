const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "toiletx",
    aliases: ["tx", "flushx", "toiletx"],
    version: "9.0",
    author: "Raiyan Dev X",
    countDown: 1,
    role: 0,
    shortDescription: "Toilet X Pro Max 🚽🔥",
    category: "fun",
    guide: "{pn} @mention / text"
  },

  onStart: async function ({ api, event, args }) {

    const mention = Object.keys(event.mentions)[0];
    const target = mention 
      ? event.mentions[mention] 
      : (args.join(" ") || "Unknown User");

    const styles = [
`🚨 𝗧𝗢𝗜𝗟𝗘𝗧 𝗦𝗬𝗦𝗧𝗘𝗠 🚨
👤 Target: ${target}
💩 Pressure: MAX (999%)
🚽 Action: Auto Send...`,

`🧻 ${target} detected!
📡 Scanning Complete ✅
🚽 Teleporting to toilet...
💀 Done 🤣`,

`💀 SYSTEM FAILURE!
${target} control haraiya dise 😂
🚽 Emergency flush activated 🌊`,

`🚽 ${target} entered danger zone!
⏳ Processing...
💩 Mission Success 😂🔥`,

`🤣 ${target} ekhon toilet e VIP guest 😈
🧻 Service: Premium
🚽 Status: Busy 💀`
    ];

    const randomMsg = styles[Math.floor(Math.random() * styles.length)];

    const imgPath = path.join(__dirname, "cache", "toilet.jpg");

    // image optional (error free)
    if (!fs.existsSync(imgPath)) {
      return api.sendMessage(randomMsg + "\n\n⚠️ image missing!", event.threadID, event.messageID);
    }

    return api.sendMessage({
      body: randomMsg,
      attachment: fs.createReadStream(imgPath)
    }, event.threadID, event.messageID);
  }
};
