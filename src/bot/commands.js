"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCommands = registerCommands;
const newsService_1 = require("../api/newsService");
const userModel_1 = require("../db/userModel");
const format_1 = require("./format");
function registerCommands(bot) {
    bot.onText(/\/start/, (msg) => {
        bot.sendMessage(msg.chat.id, `📰 Welcome to News Bot!\n\nCommands:\n/start - Welcome\n/latest - Latest News\n/categories - Choose Category\n/subscribe - Daily News\n/unsubscribe - Stop News`);
    });
    bot.onText(/\/latest/, async (msg) => {
        const articles = await (0, newsService_1.getTopHeadlines)();
        if (!articles.length) {
            return bot.sendMessage(msg.chat.id, "No articles found.");
        }
        for (const article of articles) {
            const text = (0, format_1.formatArticleMarkdownV2)(article);
            await bot.sendMessage(msg.chat.id, text, {
                parse_mode: "MarkdownV2",
                disable_web_page_preview: false,
            });
        }
    });
    bot.onText(/\/categories/, (msg) => {
        bot.sendMessage(msg.chat.id, "📂 Choose a category:", {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "💼 Business", callback_data: "category:business" }],
                    [{ text: "💻 Technology", callback_data: "category:technology" }],
                    [{ text: "⚽ Sports", callback_data: "category:sports" }],
                ],
            },
        });
    });
    bot.onText(/\/subscribe/, async (msg) => {
        await userModel_1.User.updateOne({ chatId: msg.chat.id }, { $set: { subscribed: true } }, { upsert: true });
        bot.sendMessage(msg.chat.id, "✅ You are subscribed to daily news!");
    });
    bot.onText(/\/unsubscribe/, async (msg) => {
        await userModel_1.User.updateOne({ chatId: msg.chat.id }, { $set: { subscribed: false } });
        bot.sendMessage(msg.chat.id, "❌ You unsubscribed from daily news.");
    });
    // Listen for all messages
    bot.on("message", async (msg) => {
        const chatId = msg.chat.id;
        // ✅ If the message is not text (voice, audio, video, etc.)
        if (!msg.text) {
            return bot.sendMessage(chatId, "⚠️ I can only understand text messages. Please use the buttons below.", {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "latest", callback_data: "latest" }],
                        [{ text: "categories", callback_data: "categories" }],
                        [{ text: "📅 Subscribe", callback_data: "subscribe" }],
                        [{ text: "❌ Unsubscribe", callback_data: "unsubscribe" }],
                    ],
                },
            });
        }
        // ✅ If the message is text but not recognized
        if (msg.text !== "latest" &&
            msg.text !== "categories" &&
            msg.text !== "📅 Subscribe" &&
            msg.text !== "❌ Unsubscribe" &&
            !msg.text.startsWith("/start")) {
            return bot.sendMessage(chatId, "❓ I didn’t understand that. Please use the buttons below.", {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "latest", callback_data: "latest" }],
                        [{ text: "categories", callback_data: "categories" }],
                        [{ text: "📅 Subscribe", callback_data: "subscribe" }],
                        [{ text: "❌ Unsubscribe", callback_data: "unsubscribe" }],
                    ],
                },
            });
        }
    });
}
//# sourceMappingURL=commands.js.map