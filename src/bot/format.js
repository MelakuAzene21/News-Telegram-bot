"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeMarkdownV2 = escapeMarkdownV2;
exports.formatArticleMarkdownV2 = formatArticleMarkdownV2;
// Escapes special characters for Telegram MarkdownV2
function escapeMarkdownV2(text) {
    // Based on Telegram MarkdownV2 escaping rules
    return (text || "")
        .replace(/[_*\[\]()~`>#+\-=|{}.!]/g, (m) => `\\${m}`);
}
function formatArticleMarkdownV2(article) {
    const safeTitle = escapeMarkdownV2(article.title);
    const safeDescription = article.description
        ? escapeMarkdownV2(article.description)
        : "";
    const safeSource = article.source ? escapeMarkdownV2(article.source) : "";
    const titleLine = `[${safeTitle}](${article.url})`;
    const sourceLine = safeSource ? `\n\nSource: *${safeSource}*` : "";
    const descriptionLine = safeDescription ? `\n${safeDescription}` : "";
    return `📰 ${titleLine}${descriptionLine}${sourceLine}`;
}
//# sourceMappingURL=format.js.map