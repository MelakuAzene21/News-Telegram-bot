import cron from "node-cron";
import { User } from "../db/userModel";
import { getTopHeadlines } from "../api/newsService";
import TelegramBot from "node-telegram-bot-api";
import { formatArticleMarkdownV2 } from "../bot/format";

export function startScheduler(bot: TelegramBot) {
  cron.schedule("0 8 * * *", async () => {
    const users = await User.find({ subscribed: true });
    const articles = await getTopHeadlines();

    users.forEach(async (u) => {
      if (!articles.length) {
        await bot.sendMessage(u.chatId, "No articles found today.");
        return;
      }
      await bot.sendMessage(u.chatId, "🌅 Good Morning! Here are today’s top news:");
      for (const article of articles) {
        const text = formatArticleMarkdownV2(article as any);
        await bot.sendMessage(u.chatId, text, {
          parse_mode: "MarkdownV2",
          disable_web_page_preview: false,
        });
      }
    });
  });
}
