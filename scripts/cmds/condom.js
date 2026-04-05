const fs = require("fs");

module.exports = {
  config: {
    name: "condom",
    aliases: ["cdm"],
    version: "1.0",
    author: "Raiyan Dev",
    countDown: 5,
    role: 0,
    shortDescription: "Funny Condom Troll 😂",
    category: "fun",
    guide: "{pn} @mention"
  },

  onStart: async function ({ message, event, usersData }) {

    const mention = Object.keys(event.mentions)[0];
    const name = mention ? event.mentions[mention] : "Tumi 😹";

    const msgs = [
      `${name} ke condom gift deya holo 😂🎁`,
      `${name} safety first bro 😎🛡️`,
      `${name} ajke ready full protection 😹`,
      `${name} use korte vulish na 😏`,
      `${name} ekdom premium protection peye gelo 😆✨`
    ];

    const random = msgs[Math.floor(Math.random() * msgs.length)];

    message.reply(random);
  }
};
