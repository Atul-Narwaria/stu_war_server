"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = require("ioredis");
const redisConfig = {
    port: 6379,
    host: "127.0.0.1",
};
const redis = new ioredis_1.Redis(redisConfig);
exports.default = redis;
