import dotenv from "dotenv";
dotenv.config();

export const env = {
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || "",
  GNEWS_API_KEY: process.env.GNEWS_API_KEY || "",
  NEWS_API_KEY: process.env.NEWS_API_KEY || "",
  MONGO_URI: process.env.MONGO_URI || "",
  PORT: process.env.PORT || 5000,
};
