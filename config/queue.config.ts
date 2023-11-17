import { Queue, QueueEvents, Worker } from "bullmq";
import redis from "./redis.config";
import { createbatchLiveClass } from "../controller/zoom/zoomController";

const BatchLiveClass = new Queue("BatchLiveClass", { connection: redis });
BatchLiveClass.add("BatchLiveClass", {
  jobId: "uniqueId",
});

const worker = new Worker("BatchLiveClass", async (job) => {
  if (job.name === "BatchLiveClass") {
    // await createbatchLiveClass();
  }
  BatchLiveClass.add(
    "BatchLiveClass",
    {},
    {
      repeat: {
        pattern: "1 1 4 * * *",
      },
    }
  );
});
worker.on("failed", (job: any, err) => {
  console.error(`Job ${job.id} failed with error: ${err}`);
});
export const queueEvents: any = new QueueEvents("BatchLiveClass");
module.exports = {
  queueEvents,
};
