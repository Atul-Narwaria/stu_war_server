import { Request, Response, Router } from "express";
import { isInstitute, validateToken } from "../middleware/authMiddleware";
import { ZoomMeetingCreateSchema } from "../middleware/requestValidation";
import {
  createBatchZoomClass,
  createZoomMeeting,
  getMeetingList,
} from "../controller/zoom/zoomController";

export const ZoomInstitueRoutes = Router();

ZoomInstitueRoutes.post(
  "/create",
  [validateToken, isInstitute],
  async (req: Request, res: Response) => {
    try {
      const reqError = ZoomMeetingCreateSchema.validate(req.body);
      if (reqError?.error) {
        return res
          .status(422)
          .json({ status: "error", message: reqError.error?.message });
      }
      const { topic, start_time, duration, password } = req.body;
      let { code, status, message } = await createZoomMeeting(
        topic,
        start_time,
        duration,
        password
      );
      return res.status(code).json({ status, message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);

ZoomInstitueRoutes.get(
  "/get/meetings",
  [validateToken, isInstitute],
  async (req: Request, res: Response) => {
    try {
      let get = await getMeetingList();
      return res.status(200).json(get);
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);

ZoomInstitueRoutes.post(
  "/signature",
  [validateToken],
  async (req: Request, res: Response) => {
    try {
      let get = await getMeetingList();
      return res.status(200).json(get);
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
// createBatchZoomClass

ZoomInstitueRoutes.post(
  "/create/batch/class",
  [validateToken],
  async (req: Request, res: Response) => {
    try {
      let get = await createBatchZoomClass(req.body.batchId);
      return res.status(200).json(get);
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
