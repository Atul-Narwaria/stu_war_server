import { Request, Response, Router } from "express";
import { isInstitute, validateToken } from "../../middleware/authMiddleware";
import {
  instituteBatchCreateSchema,
  instituteBatchStatusSchema,
} from "../../middleware/requestValidation";
import {
  InstituteBatchSeach,
  createBatch,
  deleteBatch,
  editBatch,
  getActiveBatch,
  getAllbatch,
  getBatchById,
  updateBatchStatus,
} from "../../model/batch/batch";
import {
  liveClassDetail,
  updateStatusBatchLiveClass,
} from "../../model/batch/batchLiveClass";

export const batchRoutes = Router();

batchRoutes.post(
  "/create",
  [validateToken, isInstitute],
  async (req: Request, res: Response) => {
    try {
      const reqError = instituteBatchCreateSchema.validate(req.body);
      if (reqError?.error) {
        return res
          .status(422)
          .json({ status: "error", message: reqError.error?.message });
      }
      if (req.body.start_time === req.body.end_time) {
        return res.status(422).json({
          status: "error",
          message: "start and end time can not be the same",
        });
      }
      let { code, status, message } = await createBatch(req.body, req.userid);
      return res.status(code).json({ status, message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
batchRoutes.put(
  "/edit/:id",
  [validateToken, isInstitute],
  async (req: Request, res: Response) => {
    try {
      const reqError = instituteBatchCreateSchema.validate(req.body);
      if (reqError?.error) {
        return res
          .status(422)
          .json({ status: "error", message: reqError.error?.message });
      }
      if (req.body.start_time === req.body.end_time) {
        return res.status(422).json({
          status: "error",
          message: "start and end time can not be the same",
        });
      }
      let { code, status, message } = await editBatch(req.body, req.params.id);
      return res.status(code).json({ status, message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
batchRoutes.put(
  "/update/:id",
  [validateToken, isInstitute],
  async (req: Request, res: Response) => {
    try {
      const reqError = instituteBatchStatusSchema.validate(req.body);
      if (reqError?.error) {
        return res
          .status(200)
          .json({ status: "error", message: reqError.error?.message });
      }
      let { code, status, message } = await updateBatchStatus(
        req.params.id,
        req.body.status
      );
      return res.status(code).json({ status, message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
batchRoutes.get(
  "/get/active",
  [validateToken, isInstitute],
  async (req: Request, res: Response) => {
    try {
      let { code, status, message } = await getActiveBatch(req.userid);
      return res.status(code).json({ status, message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
batchRoutes.get(
  "/get/all",
  [validateToken, isInstitute],
  async (req: Request, res: Response) => {
    try {
      const page: any = req.query.page || 1;
      const insID: string = req.userid;
      const { code, status, message, totalPage, totalRow } = await getAllbatch(
        page,
        req.userid
      );
      return res.status(code).json({
        status: status,
        message: message,
        totalPage: totalPage,
        totalRow,
      });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
batchRoutes.delete(
  "/delete/:id",
  [validateToken, isInstitute],
  async (req: Request, res: Response) => {
    try {
      let { code, status, message } = await deleteBatch(req.params.id);
      return res.status(code).json({ status, message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
batchRoutes.get(
  "/get/search",
  [validateToken, isInstitute],
  async (req: Request, res: Response) => {
    try {
      const page: any = req.query.page || 1;
      const insID: string = req.userid;
      const query: any = req.query.query || null;
      const { code, status, message, totalPage, totalRow } =
        await InstituteBatchSeach(page, query, insID);
      return res.status(code).json({
        status: status,
        message: message,
        totalPage: totalPage,
        totalRow: totalRow,
      });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
batchRoutes.get(
  "/get/batch/:id",
  [validateToken, isInstitute],
  async (req: Request, res: Response) => {
    try {
      const { code, status, message } = await getBatchById(req.params.id);
      return res.status(code).json({ status: status, message: message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
batchRoutes.put(
  "/update/live-class/:id",
  [validateToken, isInstitute],
  async (req: Request, res: Response) => {
    try {
      if (
        req.params.id === undefined ||
        req.params.id === null ||
        req.body.status === undefined ||
        req.body.status === null
      ) {
        return res
          .status(422)
          .json({ status: "error", message: "data required" });
      }
      const { code, status, message } = await updateStatusBatchLiveClass(
        req.params.id,
        req.body.status
      );
      return res.status(code).json({ status: status, message: message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);

batchRoutes.get(
  "/get/liveClass/:id",
  [validateToken, isInstitute],
  async (req: Request, res: Response) => {
    try {
      const { code, status, message } = await liveClassDetail(req.params.id);
      return res.status(code).json({ status: status, message: message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
