"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerHandlers = registerHandlers;
const newsService_1 = require("../api/newsService");
const format_1 = require("./format");
function registerHandlers(bot) {
    bot.on("callback_query", async (query) => {
        if (!query.data || !query.message)
            return;
        const category = query.data;
        const articles = await (0, newsService_1.getTopHeadlines)(category);
        if (!articles.length) {
            return bot.sendMessage(query.message.chat.id, "No articles found.");
        }
        for (const article of articles) {
            const text = (0, format_1.formatArticleMarkdownV2)(article);
            await bot.sendMessage(query.message.chat.id, text, {
                parse_mode: "MarkdownV2",
                disable_web_page_preview: false,
            });
        }
    });
}
//# sourceMappingURL=handlers.js.map