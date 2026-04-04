module.exports = {
  config: {
    name: "funny",
    aliases: ["troll", "moja"],
    version: "1.0",
    author: "Fun Dev",
    countDown: 2,
    role: 0,
    shortDescription: "Funny troll 😂",
    category: "fun",
    guide: "{pn} @mention"
  },

  onStart: async function ({ api, event }) {

    const name = Object.values(event.mentions)[0] || "User";

    const msg = [
      `😂 ${name} ekta pura comedy piece 🤡`,
      `💀 ${name} ke dekhe Google o confused 🤣`,
      `🤣 ${name} er brain loading hocche... 0%`,
      `🤡 ${name} hocche group er VIP joker 😂`,
      `💩 ${name} ajkeo useless mode e ase 😈`,
      `🐸 ${name} er face dekhle phone hang hoy 🤣`,
      `😆 ${name} ke NASA te pathano lagbe—alien mone hocche 👽`,
      `😂 ${name} ekta walking meme 🤡`,
      `💀 ${name} er life = buffering... ⏳`,
      `🤣 ${name} holo free entertainment 🎭`
    ];

    const random = msg[Math.floor(Math.random() * msg.length)];

    return api.sendMessage(random, event.threadID, event.messageID);
  }
};
