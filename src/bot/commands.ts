import TelegramBot from "node-telegram-bot-api";
import { getTopHeadlines } from "../api/newsService";
import { User } from "../db/userModel";

export function registerCommands(bot: TelegramBot) {
  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(
      msg.chat.id,
      `📰 Welcome to News Bot!\n\nCommands:\n/start - Welcome\n/latest - Latest News\n/categories - Choose Category\n/subscribe - Daily News\n/unsubscribe - Stop News`
    );
  });

  bot.onText(/\/latest/, async (msg) => {
    const articles = await getTopHeadlines();
    let response = "📰 Top Headlines:\n\n";
    articles.forEach((a, i) => {
      response += `${i + 1}. ${a.title}\n${a.url}\n\n`;
    });
    bot.sendMessage(msg.chat.id, response);
  });

  bot.onText(/\/categories/, (msg) => {
    bot.sendMessage(msg.chat.id, "Choose a category:", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Business", callback_data: "business" }],
          [{ text: "Technology", callback_data: "technology" }],
          [{ text: "Sports", callback_data: "sports" }],
        ],
      },
    });
  });

  bot.onText(/\/subscribe/, async (msg) => {
    await User.updateOne(
      { chatId: msg.chat.id },
      { $set: { subscribed: true } },
      { upsert: true }
    );
    bot.sendMessage(msg.chat.id, "✅ You are subscribed to daily news!");
  });

  bot.onText(/\/unsubscribe/, async (msg) => {
    await User.updateOne(
      { chatId: msg.chat.id },
      { $set: { subscribed: false } }
    );
    bot.sendMessage(msg.chat.id, "❌ You unsubscribed from daily news.");
  });


  // Listen for all messages
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;

    // ✅ If the message is not text (voice, audio, video, etc.)
    if (!msg.text) {
      return bot.sendMessage(
        chatId,
        "⚠️ I can only understand text messages. Please use the buttons below.",
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "latest", callback_data: "latest" }],
              [{ text: "categories", callback_data: "categories" }],
              [{ text: "📅 Subscribe", callback_data: "subscribe" }],
              [{ text: "❌ Unsubscribe", callback_data: "unsubscribe" }],
            ],
          },
        }
      );
    }

    // ✅ If the message is text but not recognized
    if (
      msg.text !== "latest" &&
      msg.text !== "categories" &&
      msg.text !== "📅 Subscribe" &&
      msg.text !== "❌ Unsubscribe" &&
      !msg.text.startsWith("/start")
    ) {
      return bot.sendMessage(
        chatId,
        "❓ I didn’t understand that. Please use the buttons below.",
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "latest", callback_data: "latest" }],
              [{ text: "categories", callback_data: "categories" }],
              [{ text: "📅 Subscribe", callback_data: "subscribe" }],
              [{ text: "❌ Unsubscribe", callback_data: "unsubscribe" }],
            ],
          },
        }
      );
    }
  });

}