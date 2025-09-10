import TelegramBot from "node-telegram-bot-api";
import { getTopHeadlines } from "../api/newsService";

export function registerHandlers(bot: TelegramBot) {
  bot.on("callback_query", async (query) => {
    if (!query.data || !query.message) return;
    const category = query.data;
    const articles = await getTopHeadlines(category);
    let response = `📰 ${category.toUpperCase()} News:\n\n`;
    articles.forEach((a, i) => {
      response += `${i + 1}. ${a.title}\n${a.url}\n\n`;
    });
    bot.sendMessage(query.message.chat.id, response);
  });
}
