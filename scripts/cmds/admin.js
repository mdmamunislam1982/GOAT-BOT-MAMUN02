const axios = require("axios");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
    name: "admin",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "Mamun",
    description: "Show Owner Info",
    commandCategory: "info",
    usages: "",
    cooldowns: 5
};

module.exports.run = async function({ api, event }) {
    const time = moment().tz("Asia/Dhaka").format("DD MMMM YYYY, hh:mm:ss A");
    const imgPath = __dirname + "/cache/admin.png";

    try {
        // Image Download (axios দিয়ে - request বাদ)
        const res = await axios.get(
            "https://graph.facebook.com/100057754863882/picture?height=720&width=720",
            { responseType: "arraybuffer" }
        );

        fs.writeFileSync(imgPath, Buffer.from(res.data, "utf-8"));

        const msg = `
┏━━━━━━━━━━━━━━━━━━━━━┓
┃      🌟 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 🌟      
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 👤 𝐍𝐚𝐦𝐞      : M A M U N ッ
┃ 🚹 𝐆𝐞𝐧𝐝𝐞𝐫    : Male
┃ ❤️ 𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧  : Single
┃ 🎂 𝐀𝐠𝐞       : 19
┃ 🕌 𝐑𝐞𝐥𝐢𝐠𝐢𝐨𝐧  : Islam
┃ 🏫 𝐄𝐝𝐮𝐜𝐚𝐭𝐢𝐨𝐧 : Inter 1st Year
┃ 🏡 𝐀𝐝𝐝𝐫𝐞𝐬𝐬  : Rajshahi, Bangladesh
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 🎭 𝐓𝐢𝐤𝐭𝐨𝐤  : Mamun01
┃ 📢 𝐓𝐞𝐥𝐞𝐠𝐫𝐚𝐦 : t.me/John_USA90
┃ 🌐 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 : fb.com/md.mamun.islam3210
┣━━━━━━━━━━━━━━━━━━━━━┫
┃ 🤖 𝐁𝐨𝐭 𝐍𝐚𝐦𝐞 : Mamun Bot
┃ ⚡ 𝐒𝐭𝐚𝐭𝐮𝐬    : Active 🟢
┃ 🕒 𝐓𝐢𝐦𝐞      : ${time}
┗━━━━━━━━━━━━━━━━━━━━━┛
        `;

        api.sendMessage(
            {
                body: msg,
                attachment: fs.createReadStream(imgPath)
            },
            event.threadID,
            () => fs.unlinkSync(imgPath),
            event.messageID
        );

    } catch (err) {
        api.sendMessage("❌ Error loading admin info!", event.threadID);
        console.log(err);
    }
};
