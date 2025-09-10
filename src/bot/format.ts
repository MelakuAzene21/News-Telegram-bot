export type NewsArticle = {
  title: string;
  url: string;
  description?: string;
  source?: string;
};

// Escapes special characters for Telegram MarkdownV2
export function escapeMarkdownV2(text: string): string {
  // Based on Telegram MarkdownV2 escaping rules
  return (text || "")
    .replace(/[_*\[\]()~`>#+\-=|{}.!]/g, (m) => `\\${m}`);
}

export function formatArticleMarkdownV2(article: NewsArticle): string {
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


