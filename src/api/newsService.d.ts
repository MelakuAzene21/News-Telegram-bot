export interface Article {
    title: string;
    url: string;
    description?: string;
    source?: string;
}
export declare function getTopHeadlines(category?: string): Promise<Article[]>;
//# sourceMappingURL=newsService.d.ts.map