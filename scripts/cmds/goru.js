const fs = require("fs");
const axios = require("axios");

module.exports = {
  config: {
    name: "goru",
    version: "1.0",
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
    if (!mention) return api.sendMessage("⚠️ একজনকে মেনশন করো!", event.threadID);

    const name = event.mentions[mention].replace("@","");

    const img = (await axios.get("https://files.catbox.moe/ku4hnj.jpg", { responseType: "stream" })).data;

    api.sendMessage({
      body: `🤣🐮 @${name} একদম আসল গরু হয়ে গেছে বিদেশী গরু! ✨`,
      mentions: [{
        id: mention,
        tag: `@${name}`
      }],
      attachment: img
    }, event.threadID);
  }
};
