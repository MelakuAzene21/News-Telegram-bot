export type NewsArticle = {
    title: string;
    url: string;
    description?: string;
    source?: string;
};
export declare function escapeMarkdownV2(text: string): string;
export declare function formatArticleMarkdownV2(article: NewsArticle): string;
//# sourceMappingURL=format.d.ts.map