const { Sequelize } = require("sequelize");
const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

const toBool = (x) => x == "true";

DATABASE_URL = process.env.DATABASE_URL || "./lib/database.db";
let HANDLER = "false";

module.exports = {
  //For Enabling Commands Like AUTO_STATUS_RED Type true For Disenabling Type false
  ANTILINK: toBool(process.env.ANTI_LINK) || false,
  //_________________________________________________________________________________________________________________________________
  LOGS: toBool(process.env.LOGS) || true,
  //_________________________________________________________________________________________________________________________________
  ANTILINK_ACTION: process.env.ANTI_LINK || "kick",
  //_________________________________________________________________________________________________________________________________
  AUTO_REACT: process.env.AUTO_REACT || 'false',
  //_________________________________________________________________________________________________________________________________
  AUDIO_DATA: process.env.AUDIO_DATA || "Phoenix-MD;Abhishek Suresh;https://graph.org/file/8976892f2f615077b48cd.jpg",
  //_________________________________________________________________________________________________________________________________
  AUTO_STATUS_READ: process.env.AUTO_STATUS_READ || 'false',
  //_________________________________________________________________________________________________________________________________
  SESSION_ID: process.env.SESSION_ID || "PANTHER;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUl1RjNXdnk4UjMyZVZnV21hb2ZHcmliSTIzNjdJVEVYK0pGc3pMUjUwND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUk5qNzlUKzJla3ZZbmF1aEpJbGc1YWtwMFduL1JOUm9LZXg3MVRFeFpDUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDS3kvbVM3Tm1yRzlzQUM0Rmp2aXJBOEoySm5rUmluaFh5TVM4WnJzZ0VZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHdm5JVHQwaU01RlhIT0NNMklVbnhLaEJoMlhtV1NCaUlIQW1uMnQ4a2k4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVQNFVDaXoxcE1WdXpKWEQxYWVwaFBqVy8ySHFXdUVLVzY2RzVaY1pSWEk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImV2QU5xWDZTWVlBZyt5andZV1NvRDc2aHAzK2JVWWFWRkJMQ3lEc2R0MEE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU1BkSFRoSjh2cFM1VUFQanNuZEozUmsxQXR5MkI2YlB0U2szQnNmVUNtTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZE5wSm1iT3FBQlg4T0p2NExPNDgzMzJDY0Q5eU10R2RKczllSDNBK2Frcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imx0ZXRsdXRBazR2SmZ5SEhZS0ZjTXpQeGk3RWJ3clNaaHkvR2lNVnAxZEVLZS9SK1ZKVFF5aEEyUnU5ekpubnpOQzJqc0hGUlpjblplbzBPeGVCNGlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTUsImFkdlNlY3JldEtleSI6IlZtUXlhQjdyU2FhOTdPS0JCL0ZYOHlPZXpqR3JhWDFJbEZPRjI3blRHZTQ9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODE0OTQ5NDYzMkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJENkI1NUZEODAyN0JDNTNFQzM1OEFERjlBQjc2NkIwNyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzE2MTgwODcxfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ4MTQ5NDk0NjMyQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkQ4NDlENzU5M0EzN0RDNzMyRTFDODg0OUMwQzZDNjVEIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTYxODA4NzF9XSwibmV4dFByZUtleUlkIjo2MSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjYxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkY3UVFPOVJNU3BDRGV2S1BseGs0QlEiLCJwaG9uZUlkIjoiOTAwOGRlODgtMTE3NS00ZTZiLWI0OGQtYzJlYWIzODI2OTIyIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdtYzV1NEU5UVpYNnZGeHlvc2wrY0dPZ3FxND0ifSwicmVnaXN0ZXJlZCI6ZmFsc2UsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmJkN0E4VXdXbU9JcGRzTjZOOE1Rd0Uxa0pRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTnVobmZnR0VQZXVxN0lHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoieEFadVVZNEdZU2hJd1JUcjlXa0U0bDFFdU9zeGgramJRUUgzK2xNaUZSQT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiQ3Z4R2trUkhGODVURHVTWCtsNlJhenpveVQ3dG9WdHA2b0piRkwrUytOSmYyNDNlNjlxMXlnbUMvMXQvK1FkN0ZlOUwyNXJ1c1RtbmNIMHltblFrQkE9PSIsImRldmljZVNpZ25hdHVyZSI6IldHS0djdEt2b0FkVDdDcnN5T2R2STlRQW9RaFBKYStsUXMrUGdXcHk0dWhVZUdtNkM5blFZblE3Vkg4UmxSS2QwTTV4dEdXcHh0TTNZOGxsRUVDTGdBPT0ifSwibWUiOnsiaWQiOiIyMzQ4MTQ5NDk0NjMyOjNAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiSmFtZXPinaTigI3wn5Sl8J+QiSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTQ5NDk0NjMyOjNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCY1FHYmxHT0JtRW9TTUVVNi9WcEJPSmRSTGpyTVlmbzIwRUI5L3BUSWhVUSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcxNjE4MDg2OCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFFczQifQ==", //Enter Your Session Id Here
  //_________________________________________________________________________________________________________________________________
  SUDO: process.env.SUDO || "919074692450",
  //_________________________________________________________________________________________________________________________________
  SPAM_COUNT: process.env.SPAM_COUNT || "10",
  //_________________________________________________________________________________________________________________________________
  LANG: process.env.LANG || "EN",
  //_________________________________________________________________________________________________________________________________
  HANDLERS: process.env.PREFIX || '.',
  //_________________________________________________________________________________________________________________________________
  RMBG_KEY: process.env.RMBG_KEY || false,
  //_________________________________________________________________________________________________________________________________
  BRANCH: "main",
  //_________________________________________________________________________________________________________________________________
  STICKER_DATA: "🎯𝙿𝚑𝚘𝚎𝚗𝚒𝚡-𝙼𝙳;𝙰𝚋𝚑𝚒𝚜𝚑𝚎𝚔 𝚂𝚞𝚛𝚎𝚜𝚑☘️",
  //_________________________________________________________________________________________________________________________________
  WELCOME_MSG: process.env.WELCOME_MSG || "👋 Hello *@user* Welcome To Our Group *@gname*\n*Total Members:* @count\n*Group Description:*\n@gdesc {pp}",
  //_________________________________________________________________________________________________________________________________
  GOODBYE_MSG: process.env.GOODBYE_MSG || "👋 GoodBye *@user* From *@gname*\n*Total Members:* @count {pp}",
  //_________________________________________________________________________________________________________________________________
  DATABASE_URL: DATABASE_URL,
  //_________________________________________________________________________________________________________________________________
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || " ",
  //_________________________________________________________________________________________________________________________________
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || " ",
  //_________________________________________________________________________________________________________________________________
  OWNER_NAME: process.env.OWNER_NAME || "James 𓃵",
  //_________________________________________________________________________________________________________________________________
  OWNER_NUMBER: process.env.OWNER_NUMBER || "2348149494632",
  //_________________________________________________________________________________________________________________________________
  BOT_NAME: process.env.BOT_NAME || "Phoenix-MD",
  //_________________________________________________________________________________________________________________________________
  WORK_TYPE: process.env.MODE || "public",
  //_________________________________________________________________________________________________________________________________
  MENTION_DATA: "01:43 ━━━━●───── 03:50;⇆ㅤ ||◁ㅤ❚❚ㅤ▷||ㅤ ⇆;919074692450;https://graph.org/file/63942461d4b8d78b360d3.jpg",
  //_________________________________________________________________________________________________________________________________
  MENTION_AUDIO: "https://i.imgur.com/NCifJWe.mp4;https://graph.org/file/ecf0772cb95111796848c.mp4",
  //_________________________________________________________________________________________________________________________________
  MENTION: process.env.MENTION || 'true',
  //_________________________________________________________________________________________________________________________________
  BASE_URL: "https://abhi-api-bvws.onrender.com/",
  //_________________________________________________________________________________________________________________________________
  //Database
  DATABASE:
    DATABASE_URL === "./lib/database.db"
      ? new Sequelize({
          dialect: "sqlite",
          storage: DATABASE_URL,
          logging: false,
        })
      : new Sequelize(DATABASE_URL, {
          dialect: "postgres",
          ssl: true,
          protocol: "postgres",
          dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
          },
          logging: false,
        }),
};
