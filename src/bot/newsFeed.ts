import TelegramBot from "node-telegram-bot-api";
import { getTopHeadlines, Article } from "../api/newsService";
import cron from "node-cron";

export function setupNewsFeed(bot: TelegramBot) {
  const targetChatId = "@addis_mereja21"; // or numeric chatId e.g. -1001234567890

  // ⏰ Run once per day at 2:00 AM
  cron.schedule("0 2 * * *", async () => {
    try {
      const articles = await getTopHeadlines();

      if (!articles || articles.length === 0) {
        return bot.sendMessage(targetChatId, "⚠️ No news available right now.");
      }

      let message = "📰 *Daily News Update*\n\n";
      articles.slice(0, 5).forEach((a: Article, i: number) => {
        message += `${i + 1}. <a href="${a.url}">${a.title}</a>\n\n`;
      });

      await bot.sendMessage(targetChatId, message, { parse_mode: "HTML" });
      console.log("✅ Daily news sent to channel at 2AM");
    } catch (err) {
      console.error("❌ Failed to send daily news:", err);
    }
  });
}
