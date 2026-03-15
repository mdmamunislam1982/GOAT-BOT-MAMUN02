‎const fs = require("fs-extra");
‎const path = require("path");
‎const https = require("https");
‎
‎module.exports = {
‎  config: {
‎    name: "help",
‎    aliases: ["menu", "commands"],
‎    version: "5.0",
‎    author: "MAMUN -BOSS",
‎    shortDescription: "𝙎𝙝𝙤𝙬 𝙖𝙡𝙡 𝙘𝙤𝙢𝙢𝙖𝙣𝙙𝙨",
‎    longDescription: "𝘿𝙞𝙨𝙥𝙡𝙖𝙮𝙨 𝙖 𝙗𝙚𝙖𝙪𝙩𝙞𝙛𝙪𝙡 𝙛𝙤𝙣𝙩-𝙨𝙩𝙮𝙡𝙚𝙙 𝙘𝙖𝙩𝙚𝙜𝙤𝙧𝙞𝙯𝙚𝙙 𝙘𝙤𝙢𝙢𝙖𝙣𝙙 𝙢𝙚𝙣𝙪.",
‎    category: "system",
‎    guide: "{pn}help [command name]"
‎  },
‎
‎  onStart: async function ({ message, args, prefix }) {
‎    const allCommands = global.GoatBot.commands;
‎    const categories = {};
‎
‎    // ফন্ট কনভার্টার ফাংশন
‎    const fontMap = {
‎      A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸", J: "𝙹",
‎      K: "𝙺", L: "𝙻", M: "𝙼", N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁", S: "𝚂",
‎      T: "𝚃", U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉",
‎      a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒", j: "𝚓",
‎      k: "𝚔", l: "𝚕", m: "𝚖", n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛", s: "𝚜",
‎      t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣"
‎    };
‎    const fancy = (str) => str.replace(/[A-Za-z]/g, (c) => fontMap[c] || c);
‎
‎    const emojiMap = {
‎      ai: "🤖", "ai-image": "🎨", group: "👥", system: "⚙️",
‎      fun: "🎯", owner: "👑", config: "🧠", economy: "💰",
‎      media: "🎬", "18+": "🔞", tools: "🧰", utility: "🔧",
‎      info: "ℹ️", image: "🖼️", game: "🎮", admin: "🛡️",
‎      rank: "🏅", boxchat: "💬", others: "📁"
‎    };
‎
‎    const cleanCategoryName = (text) => {
‎      if (!text) return "others";
‎      return text
‎        .normalize("NFKD")
‎        .replace(/[^\w\s-]/g, "")
‎        .replace(/\s+/g, " ")
‎        .trim()
‎        .toLowerCase();
‎    };
‎
‎    for (const [name, cmd] of allCommands) {
‎      const cat = cleanCategoryName(cmd.config.category);
‎      if (!categories[cat]) categories[cat] = [];
‎      categories[cat].push(cmd.config.name);
‎    }
‎
‎    const gifURLs = [
‎      "https://i.imgur.com/3tBIaSF.gif",
‎      "https://i.imgur.com/vWl3Tb5.gif",
‎      "https://i.imgur.com/DYfouuR.gif"
‎    ];
‎
‎    const randomGifURL = gifURLs[Math.floor(Math.random() * gifURLs.length)];
‎    const gifFolder = path.join(__dirname, "cache");
‎    if (!fs.existsSync(gifFolder)) fs.mkdirSync(gifFolder, { recursive: true });
‎    const gifName = path.basename(randomGifURL);
‎    const gifPath = path.join(gifFolder, gifName);
‎    if (!fs.existsSync(gifPath)) await downloadGif(randomGifURL, gifPath);
‎
‎    // একক কমান্ড ডিটেইল
‎    if (args[0]) {
‎      const query = args[0].toLowerCase();
‎      const cmd =
‎        allCommands.get(query) ||
‎        [...allCommands.values()].find((c) => (c.config.aliases || []).includes(query));
‎      if (!cmd) return message.reply(`❌ ${fancy(`Command "${query}" not found.`)}`);
‎
‎      const {
‎        name,
‎        version,
‎        author,
‎        guide,
‎        category,
‎        shortDescription,
‎        longDescription,
‎        aliases
‎      } = cmd.config;
‎
‎      const desc =
‎        typeof longDescription === "string"
‎          ? longDescription
‎          : longDescription?.en || shortDescription?.en || shortDescription || "No description";
‎
‎      const usage =
‎        typeof guide === "string"
‎          ? guide.replace(/{pn}/g, prefix)
‎          : guide?.en?.replace(/{pn}/g, prefix) || `${prefix}${name}`;
‎
‎      return message.reply({
‎        body:
‎          `☠️ ${fancy("COMMAND INFO")} ☠️\n\n` +
‎          `➥ ${fancy("Name")}: ${fancy(name)}\n` +
‎          `➥ ${fancy("Category")}: ${fancy(category || "Uncategorized")}\n` +
‎          `➥ ${fancy("Description")}: ${fancy(desc)}\n` +
‎          `➥ ${fancy("Aliases")}: ${fancy(aliases?.length ? aliases.join(", ") : "None")}\n` +
‎          `➥ ${fancy("Usage")}: ${fancy(usage)}\n` +
‎          `➥ ${fancy("Author")}: ${fancy(author || "Unknown")}\n` +
‎          `➥ ${fancy("Version")}: ${fancy(version || "1.0")}`,
‎        attachment: fs.createReadStream(gifPath)
‎      });
‎    }
‎
‎    // সব কমান্ড লিস্ট
‎    const formatCommands = (cmds) =>
‎      cmds.sort().map((cmd) => `🔹 ${fancy(cmd)}`).join("\n");
‎
‎    let msg = `${fancy("✨ 𝗚𝗢𝗔𝗧𝗕𝗢𝗧 𝗠𝗘𝗡𝗨 ✨")}\n━━━━━━━━━━━━━━━━━━━\n`;
‎    const sortedCategories = Object.keys(categories).sort();
‎
‎    for (const cat of sortedCategories) {
‎      const emoji = emojiMap[cat] || "📁";
‎      msg += `\n${emoji} ${fancy(`CATEGORY: ${cat.toUpperCase()}`)}\n`;
‎      msg += `${formatCommands(categories[cat])}\n`;
‎    }
‎
‎    msg += `━━━━━━━━━━━━━━━━━━━\n💡 ${fancy(`TIP: USE "${prefix}help [command]" TO GET FULL DETAILS.`)}\n🪄 ${fancy("BOT BY: MAMUN-BOSS ✨")}`;
‎
‎    return message.reply({
‎      body: msg,
‎      attachment: fs.createReadStream(gifPath)
‎    });
‎  }
‎};
‎
‎// GIF ডাউনলোড ফাংশন
‎function downloadGif(url, dest) {
‎  return new Promise((resolve, reject) => {
‎    const file = fs.createWriteStream(dest);
‎    https.get(url, (res) => {
‎      if (res.statusCode !== 200) {
‎        fs.unlink(dest, () => {});
‎        return reject(new Error(`Failed to download '${url}' (${res.statusCode})`));
‎      }
‎      res.pipe(file);
‎      file.on("finish", () => file.close(resolve));
‎    }).on("error", (err) => {
‎      fs.unlink(dest, () => {});
‎      reject(err);
‎    });
‎  });
‎}
‎
