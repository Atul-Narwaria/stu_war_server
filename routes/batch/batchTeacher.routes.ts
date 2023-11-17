import { Request, Response, Router } from "express";
import {
  isInstitute,
  isTeacher,
  validateToken,
} from "../../middleware/authMiddleware";
import {
  createBatchTeacherLink,
  deleteBatchTeacherLink,
  getAllStudentCount,
  getTeacherFromBatch,
  getTotalteacherBatchCount,
} from "../../model/batch/batchTeacherLink";
import { instituteBatchTeacher } from "../../middleware/requestValidation";
import {
  BatchListDashboard,
  TodayRemainingBatch,
} from "../../controller/batch/batchTeacher/batchTeacher.controller";

export const batchTeacher = Router();

batchTeacher.post(
  "/create",
  [validateToken, isInstitute],
  async (req: Request, res: Response) => {
    try {
      const reqError = instituteBatchTeacher.validate(req.body);
      if (reqError?.error) {
        return res
          .status(200)
          .json({ status: "error", message: reqError.error?.message });
      }
      let { code, status, message } = await createBatchTeacherLink(
        req.body.fkTeacherId,
        req.body.fkBatchId
      );
      return res.status(code).json({ status, message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
batchTeacher.get(
  "/get/teacher/:id",
  [validateToken, isInstitute],
  async (req: Request, res: Response) => {
    try {
      const { code, status, message } = await getTeacherFromBatch(
        req.params.id
      );
      return res.status(code).json({ status: status, message: message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
batchTeacher.get(
  "/get/batch/student/counts",
  [validateToken, isTeacher],
  async (req: Request, res: Response) => {
    try {
      const teacherId = req.userid;
      const { code, status, message } = await getAllStudentCount(teacherId);
      // console.log(message);
      return res.status(code).json({ status: status, message: message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
batchTeacher.get(
  "/get/batch/count",
  [validateToken, isTeacher],
  async (req: Request, res: Response) => {
    try {
      const teacherId = req.userid;
      const { code, status, message } = await getTotalteacherBatchCount(
        teacherId
      );
      // console.log(message);
      return res.status(code).json({ status: status, message: message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
batchTeacher.get(
  "/get/batch/remaning/count",
  [validateToken, isTeacher],
  async (req: Request, res: Response) => {
    try {
      const teacherId = req.userid;
      const { code, status, message } = await TodayRemainingBatch(teacherId);
      // console.log(message);
      return res.status(code).json({ status: status, message: message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
batchTeacher.get(
  "/get/batch",
  [validateToken, isTeacher],
  async (req: Request, res: Response) => {
    try {
      const teacherId = req.userid;
      const { code, status, message } = await BatchListDashboard(teacherId);
      // console.log(message);
      return res.status(code).json({ status: status, message: message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);

batchTeacher.delete(
  "/delete/:id",
  [validateToken, isInstitute],
  async (req: Request, res: Response) => {
    try {
      let { code, status, message } = await deleteBatchTeacherLink(
        req.params.id
      );
      return res.status(code).json({ status, message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
