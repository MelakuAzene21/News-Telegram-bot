"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startScheduler = startScheduler;
const node_cron_1 = __importDefault(require("node-cron"));
const userModel_1 = require("../db/userModel");
const newsService_1 = require("../api/newsService");
const format_1 = require("../bot/format");
function startScheduler(bot) {
    node_cron_1.default.schedule("0 8 * * *", async () => {
        const users = await userModel_1.User.find({ subscribed: true });
        const articles = await (0, newsService_1.getTopHeadlines)();
        users.forEach(async (u) => {
            if (!articles.length) {
                await bot.sendMessage(u.chatId, "No articles found today.");
                return;
            }
            await bot.sendMessage(u.chatId, "🌅 Good Morning! Here are today’s top news:");
            for (const article of articles) {
                const text = (0, format_1.formatArticleMarkdownV2)(article);
                await bot.sendMessage(u.chatId, text, {
                    parse_mode: "MarkdownV2",
                    disable_web_page_preview: false,
                });
            }
        });
    });
}
//# sourceMappingURL=scheduler.js.map