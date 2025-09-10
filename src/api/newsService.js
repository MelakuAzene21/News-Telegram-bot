"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopHeadlines = getTopHeadlines;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../config/env");
const NEWSAPI_BASE = "https://newsapi.org/v2";
const GNEWS_BASE = "https://gnews.io/api/v4";
async function getTopHeadlines(category) {
    try {
        // Try NewsAPI
        const url = `${NEWSAPI_BASE}/top-headlines?country=us${category ? `&category=${category}` : ""}&apiKey=${env_1.env.NEWS_API_KEY}`;
        const res = await axios_1.default.get(url);
        if (res.data.articles && res.data.articles.length > 0) {
            return res.data.articles.slice(0, 5).map((a) => ({
                title: a.title,
                url: a.url,
                description: a.description,
                source: a.source?.name,
            }));
        }
        throw new Error("NewsAPI returned no articles");
    }
    catch (err) {
        console.warn("⚠️ NewsAPI failed, switching to GNews:", err);
        try {
            const gnewsUrl = `${GNEWS_BASE}/top-headlines?country=us${category ? `&topic=${category}` : ""}&token=${env_1.env.GNEWS_API_KEY}`;
            const res = await axios_1.default.get(gnewsUrl);
            return res.data.articles.slice(0, 5).map((a) => ({
                title: a.title,
                url: a.url,
                description: a.description,
                source: a.source?.name,
            }));
        }
        catch (gerr) {
            console.error("❌ Both NewsAPI and GNews failed:", gerr);
            return [];
        }
    }
}
//# sourceMappingURL=newsService.js.map