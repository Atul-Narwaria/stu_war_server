"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueEvents = void 0;
const bullmq_1 = require("bullmq");
const redis_config_1 = __importDefault(require("./redis.config"));
const zoomController_1 = require("../controller/zoom/zoomController");
const BatchLiveClass = new bullmq_1.Queue("BatchLiveClass", { connection: redis_config_1.default });
BatchLiveClass.add("BatchLiveClass", {
    jobId: "uniqueId",
});
const worker = new bullmq_1.Worker("BatchLiveClass", (job) => __awaiter(void 0, void 0, void 0, function* () {
    if (job.name === "BatchLiveClass") {
        yield (0, zoomController_1.createbatchLiveClass)();
    }
    BatchLiveClass.add("BatchLiveClass", {}, {
        repeat: {
            pattern: "1 1 4 * * *",
        },
    });
}));
worker.on("failed", (job, err) => {
    console.error(`Job ${job.id} failed with error: ${err}`);
});
exports.queueEvents = new bullmq_1.QueueEvents("BatchLiveClass");
module.exports = {
    queueEvents: exports.queueEvents,
};
