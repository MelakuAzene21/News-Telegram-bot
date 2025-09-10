import axios from "axios";
import { env } from "../config/env";

const NEWSAPI_BASE = "https://newsapi.org/v2";
const GNEWS_BASE = "https://gnews.io/api/v4";

export async function getTopHeadlines(category?: string) {
  try {
    // Try NewsAPI
    const url = `${NEWSAPI_BASE}/top-headlines?country=us${
      category ? `&category=${category}` : ""
    }&apiKey=${env.NEWS_API_KEY}`;

    const res = await axios.get(url);
    if (res.data.articles && res.data.articles.length > 0) {
      return res.data.articles.slice(0, 5);
    }
    throw new Error("NewsAPI returned no articles");
  } catch (err) {
    console.warn("⚠️ NewsAPI failed, switching to GNews:", err);

    try {
      const gnewsUrl = `${GNEWS_BASE}/top-headlines?country=us${
        category ? `&topic=${category}` : ""
      }&token=${env.GNEWS_API_KEY}`;

      const res = await axios.get(gnewsUrl);
      return res.data.articles.slice(0, 5).map((a: any) => ({
        title: a.title,
        url: a.url,
        description: a.description,
        source: a.source?.name,
      }));
    } catch (gerr) {
      console.error("❌ Both NewsAPI and GNews failed:", gerr);
      return [];
    }
  }
}
