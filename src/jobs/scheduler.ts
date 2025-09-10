import cron from "node-cron";
import { User } from "../db/userModel";
import { getTopHeadlines } from "../api/newsService";
import TelegramBot from "node-telegram-bot-api";

export function startScheduler(bot: TelegramBot) {
  cron.schedule("0 8 * * *", async () => {
    const users = await User.find({ subscribed: true });
    const articles = await getTopHeadlines();

    let news = "🌅 Good Morning! Here are today’s top news:\n\n";
    articles.forEach((a, i) => {
      news += `${i + 1}. ${a.title}\n${a.url}\n\n`;
    });

    users.forEach((u) => {
      bot.sendMessage(u.chatId, news);
    });
  });
}
