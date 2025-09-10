import express from "express";
import mongoose from "mongoose";
import TelegramBot from "node-telegram-bot-api";
import { env } from "./config/env.js";
import { registerCommands } from "./bot/commands.js";
import { registerHandlers } from "./bot/handlers";
import { startScheduler } from "./jobs/scheduler";
import { setupNewsFeed } from "./bot/newsFeed";

const app = express();

const bot = new TelegramBot(env.TELEGRAM_BOT_TOKEN, { polling: true });

registerCommands(bot);
registerHandlers(bot);
startScheduler(bot);
setupNewsFeed(bot);

mongoose
  .connect(env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.listen(env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${env.PORT}`);
});
