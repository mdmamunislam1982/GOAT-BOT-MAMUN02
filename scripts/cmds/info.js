const axios = require("axios");
const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "info",
    aliases: ["inf", "in4"],
    version: "3.0",
    author: "Mamun",
    countDown: 5,
    role: 0,
    shortDescription: "Bot info",
    longDescription: "Show bot & owner info with video",
    category: "information",
    guide: "{pn}"
  },

  onStart: async function ({ message }) {
    return this.sendInfo(message);
  },

  onChat: async function ({ event, message }) {
    if (event.body && event.body.toLowerCase() === "info") {
      return this.sendInfo(message);
    }
  },

  sendInfo: async function (message) {

    const wait = await message.reply("⏳ Loading info...");

    setTimeout(() => {
      message.unsend(wait.messageID);
    }, 3000);

    const botName = "Mamun BOT";
    const prefix = global.GoatBot.config.prefix;

    const now = moment().tz("Asia/Dhaka");
    const date = now.format("DD MMMM YYYY");
    const time = now.format("hh:mm:ss A");

    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    const uptimeText = `${hours}h ${minutes}m ${seconds}s`;

    try {

      const res = await axios.get("https://mahabub-apis.vercel.app/info");
      const videoUrl = res?.data?.data;

      if (!videoUrl) throw new Error("No video");

      return message.reply({
        body:
`╭─〔 🌟 BOT INFO 🌟 〕─╮
│
│ 👑 Owner: Mamun
│ 🤖 Bot Name: ${botName}
│ 🔰 Prefix: ${prefix}
│ 💖 Status: Single 😏
│
│ 📅 Date: ${date}
│ ⏰ Time: ${time}
│ ⚙ Uptime: ${uptimeText}
│
│ 🌐 FB: https://www.facebook.com/md.mamun.islam3210
│ 📱 WhatsApp: 01575812932
│
╰───────────────╯`,

        attachment: await global.utils.getStreamFromURL(videoUrl)

      });

    } catch (e) {
      console.log(e);
      return message.reply("❌ Video load hoy nai, abar try koro!");
    }
  }
};
