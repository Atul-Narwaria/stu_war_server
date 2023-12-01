import { Request, Response, Router } from "express";
import { isInstitute, validateToken } from "../middleware/authMiddleware";
import { ZoomMeetingCreateSchema } from "../middleware/requestValidation";
import {
  createBatchZoomClass,
  createZoomMeeting,
  getMeetingList,
} from "../controller/zoom/zoomController";
import { KJUR } from "jsrsasign";

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

ZoomInstitueRoutes.post(
  "/signature",
  [validateToken],
  async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const iat = Math.round(new Date().getTime() / 1000) - 30;
      const exp = iat + 60 * 60 * 2;

      const oHeader = { alg: "HS256", typ: "JWT" };
      console.log(oHeader);
      const oPayload = {
        sdkKey: "MjrUGJm9R72Wtqq1npLgZA",
        mn: req.body.meetingNumber,
        role: req.body.role,
        iat: iat,
        exp: exp,
        appKey: "MjrUGJm9R72Wtqq1npLgZA",
        tokenExp: iat + 60 * 60 * 2,
      };
      console.log(oPayload);
      const sHeader = JSON.stringify(oHeader);
      const sPayload = JSON.stringify(oPayload);
      const signature: any = KJUR?.jws?.JWS.sign(
        "HS256",
        sHeader,
        sPayload,
        "AT1NNLz50oiKEJRjUeKgm6o6GyFseDjj"
      );

      res.json({
        signature: signature,
      });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);

ZoomInstitueRoutes.get(
  "/get/meetings",
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
      if (!req.body.batchId) {
        return res
          .status(423)
          .json({ status: "error", message: "batch id required" });
      }
      let get = await createBatchZoomClass(req.body.batchId);
      return res.status(200).json(get);
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);

ZoomInstitueRoutes.post(
  "/signature/test",

  async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const iat = Math.round(new Date().getTime() / 1000) - 30;
      const exp = iat + 60 * 60 * 2;

      const oHeader = { alg: "HS256", typ: "JWT" };
      // console.log(oHeader);
      const oPayload = {
        sdkKey: "MjrUGJm9R72Wtqq1npLgZA",
        mn: req.body.meetingNumber,
        role: req.body.role,
        iat: iat,
        exp: exp,
        appKey: "MjrUGJm9R72Wtqq1npLgZA",
        tokenExp: iat + 60 * 60 * 2,
      };
      // console.log(oPayload);
      const sHeader = JSON.stringify(oHeader);
      const sPayload = JSON.stringify(oPayload);
      const signature: any = KJUR?.jws?.JWS.sign(
        "HS256",
        sHeader,
        sPayload,
        "AT1NNLz50oiKEJRjUeKgm6o6GyFseDjj"
      );

      res.json({
        signature: signature,
      });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
