"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupNewsFeed = setupNewsFeed;
const newsService_1 = require("../api/newsService");
const node_cron_1 = __importDefault(require("node-cron"));
function setupNewsFeed(bot) {
    const targetChatId = "@addis_mereja21"; // or numeric chatId e.g. -1001234567890
    // ⏰ Run once per day at 2:00 AM
    node_cron_1.default.schedule("0 2 * * *", async () => {
        try {
            const articles = await (0, newsService_1.getTopHeadlines)();
            if (!articles || articles.length === 0) {
                return bot.sendMessage(targetChatId, "⚠️ No news available right now.");
            }
            let message = "📰 *Daily News Update*\n\n";
            articles.slice(0, 5).forEach((a, i) => {
                message += `${i + 1}. <a href="${a.url}">${a.title}</a>\n\n`;
            });
            await bot.sendMessage(targetChatId, message, { parse_mode: "HTML" });
            console.log("✅ Daily news sent to channel at 2AM");
        }
        catch (err) {
            console.error("❌ Failed to send daily news:", err);
        }
    });
}
//# sourceMappingURL=newsFeed.js.map