const axios = require("axios");

module.exports = {
  config: {
    name: "toilet",
    aliases: ["flushx", "wcx"],
    version: "3.0",
    author: "Zihad Dev",
    countDown: 2,
    role: 0,
    shortDescription: "Toilet system v3 🚽",
    category: "fun",
    guide: "{pn} @mention / text"
  },

  onStart: async function ({ api, event, args }) {

    const target = Object.keys(event.mentions)[0];
    const name = target ? event.mentions[target] : (args.join(" ") || "Unknown User");

    const msgList = [
      `🚽 SYSTEM ALERT 🚽
➤ ${name} has been sent to toilet successfully 💀`,

      `💩 Toilet Mission Activated!
➤ Target: ${name}
➤ Status: Flushing... 🌊`,

      `🚨 Emergency Toilet Call 🚨
➤ ${name} couldn't hold it anymore 🤣`,

      `🧻 ${name} entered toilet...
⏳ Processing...
🚽 Gone forever 😂`
    ];

    const msg = msgList[Math.floor(Math.random() * msgList.length)];

    return api.sendMessage(msg, event.threadID, event.messageID);
  }
};
