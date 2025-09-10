import TelegramBot from "node-telegram-bot-api";
import { getTopHeadlines } from "../api/newsService";
import { formatArticleMarkdownV2 } from "./format";

export function registerHandlers(bot: TelegramBot) {
  bot.on("callback_query", async (query) => {
    if (!query.data || !query.message) return;
    const category = query.data;
    const articles = await getTopHeadlines(category);
    if (!articles.length) {
      return bot.sendMessage(query.message.chat.id, "No articles found.");
    }

    for (const article of articles) {
      const text = formatArticleMarkdownV2(article as any);
      await bot.sendMessage(query.message.chat.id, text, {
        parse_mode: "MarkdownV2",
        disable_web_page_preview: false,
      });
    }
  });
}
