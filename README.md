# News Telegram Bot

Rich news Telegram bot with MarkdownV2 cards, link previews, categories, subscriptions, and in-chat pagination.

## Features
- Clickable titles with MarkdownV2 formatting
- Thumbnail/snippet link previews (when target site supports OpenGraph)
- Latest headlines and category browsing
- Prev/Next inline pagination per chat
- Daily subscription via scheduler (08:00)

## Setup
1. Install dependencies:
```bash
npm install
```

2. Create environment variables (see `src/config/env.ts`):
```
TELEGRAM_BOT_TOKEN=your_telegram_token
NEWS_API_KEY=your_newsapi_key
GNEWS_API_KEY=your_gnews_key
MONGODB_URI=your_mongodb_uri
```

3. Build and run (or use ts-node):
```bash
npm run build && npm start
# or
npm run dev
```

## Usage
- `/start` — show help
- `/latest` — open latest headlines with pagination
- `/categories` — pick a category and paginate articles
- `/subscribe` — receive daily headlines at 08:00
- `/unsubscribe` — stop daily headlines

Tap Next/Prev to navigate. Each page is a single message so Telegram can show a link preview.

## Implementation Notes
- Formatting lives in `src/bot/format.ts` (`escapeMarkdownV2`, `formatArticleMarkdownV2`).
- Pagination/session state per chat in `src/bot/state.ts`.
- Handlers for callbacks in `src/bot/handlers.ts` (`category:*`, `nav:*`).
- Commands in `src/bot/commands.ts`.
- Scheduler in `src/jobs/scheduler.ts`.

## Troubleshooting
- If previews don’t appear, the site may not provide OpenGraph tags. Try other sources.
- If Markdown errors occur, ensure all special characters are escaped (handled by `escapeMarkdownV2`).
- Make sure the bot has permission to send link previews (we set `disable_web_page_preview: false`).


