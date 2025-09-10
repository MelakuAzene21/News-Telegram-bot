"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.env = {
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || "",
    GNEWS_API_KEY: process.env.GNEWS_API_KEY || "",
    NEWS_API_KEY: process.env.NEWS_API_KEY || "",
    MONGO_URI: process.env.MONGO_URI || "",
    PORT: process.env.PORT || 5000,
};
//# sourceMappingURL=env.js.map