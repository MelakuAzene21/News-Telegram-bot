"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const env_js_1 = require("./config/env.js");
const commands_js_1 = require("./bot/commands.js");
const handlers_1 = require("./bot/handlers");
const scheduler_1 = require("./jobs/scheduler");
const newsFeed_1 = require("./bot/newsFeed");
const app = (0, express_1.default)();
const bot = new node_telegram_bot_api_1.default(env_js_1.env.TELEGRAM_BOT_TOKEN, { polling: true });
(0, commands_js_1.registerCommands)(bot);
(0, handlers_1.registerHandlers)(bot);
(0, scheduler_1.startScheduler)(bot);
(0, newsFeed_1.setupNewsFeed)(bot);
mongoose_1.default
    .connect(env_js_1.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB error:", err));
app.listen(env_js_1.env.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${env_js_1.env.PORT}`);
});
//# sourceMappingURL=index.js.map