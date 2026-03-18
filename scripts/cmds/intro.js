module.exports = {
  config: {
    name: "intro",
    version: "1.0",
    author: "Mamun",
    countDown: 5,
    role: 0,
    shortDescription: "Intro show",
    longDescription: "Show your intro",
    category: "info",
    guide: "{pn}"
  },

  onStart: async function ({ message, event, usersData }) {
    const name = await usersData.getName(event.senderID);

    return message.reply(
`╭─❍「 INTRO 」❍─╮
│ 👤 Name: ${name}
│ 🧑‍💻 Owner: Mamun
│ 🤖 Bot Name: GoatBot
│ 🌍 Country: Bangladesh
│ 💬 Status: niher besti 😅
╰──────────────╯`
    );
  }
};
