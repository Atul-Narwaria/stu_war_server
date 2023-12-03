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
  getAllTeacherBatches,
  getBatchAllStudent,
  getTeacherFromBatch,
  getTotalteacherBatchCount,
} from "../../model/batch/batchTeacherLink";
import {
  createBatchAssignemntSchema,
  instituteBatchTeacher,
} from "../../middleware/requestValidation";
import {
  BatchListDashboard,
  TodayRemainingBatch,
} from "../../controller/batch/batchTeacher/batchTeacher.controller";
import {
  createBatchAssignment,
  deletebatchAssignment,
  getBatchAssignments,
  getBatchAssignmentsCount,
  getBatchAssignmentsearch,
  showAssignmentTeacher,
} from "../../model/batch/assignmentTeacher";
import { getBatchById } from "../../model/batch/batch";

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

batchTeacher.get(
  "/get/assignments/:batch_id",
  [validateToken, isTeacher],
  async (req: Request, res: Response) => {
    try {
      if (!req.params.batch_id) {
        return res
          .status(422)
          .json({ status: "error", message: "batch id required" });
      }
      const teacherId = req.userid;
      const page: any = req.query.page || 1;
      const { code, status, message, totalPage, totalRow } =
        await getBatchAssignments(req.params.batch_id, teacherId, page);
      // console.log(message);
      return res
        .status(code)
        .json({ status: status, message: message, totalPage, totalRow });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
batchTeacher.get(
  "/get/assignments/search/:batch_id",
  [validateToken, isTeacher],
  async (req: Request, res: Response) => {
    try {
      if (!req.params.batch_id) {
        return res
          .status(422)
          .json({ status: "error", message: "batch id required" });
      }
      const teacherId = req.userid;
      const page: any = req.query.page || 1;
      const query: any = req.query.query || null;
      const { code, status, message, totalPage, totalRow } =
        await getBatchAssignmentsearch(
          req.params.batch_id,
          teacherId,
          page,
          query
        );
      // console.log(message);
      return res
        .status(code)
        .json({ status: status, message: message, totalPage, totalRow });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
batchTeacher.get(
  "/get/assignments/count/:batch_id",
  [validateToken, isTeacher],
  async (req: Request, res: Response) => {
    try {
      if (!req.params.batch_id) {
        return res
          .status(422)
          .json({ status: "error", message: "batch id required" });
      }
      const teacherId = req.userid;

      const { code, status, message } = await getBatchAssignmentsCount(
        req.params.batch_id,
        teacherId
      );
      // console.log(message);
      return res.status(code).json({ status: status, message: message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);

batchTeacher.post(
  "/create/assigment",
  [validateToken, isTeacher],
  async (req: Request, res: Response) => {
    try {
      const reqError = createBatchAssignemntSchema.validate(req.body);
      if (reqError?.error) {
        return res
          .status(422)
          .json({ status: "error", message: reqError.error?.message });
      }
      let teacherId = req.userid;
      let { code, status, message } = await createBatchAssignment(
        req.body.name,
        teacherId,
        req.body.fk_batch_id,
        req.body.contents,
        req.body.media,
        req.body.submission_date
      );
      return res.status(code).json({ status, message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);

batchTeacher.delete(
  "/delete/assignment/:id",
  [validateToken, isTeacher],
  async (req: Request, res: Response) => {
    try {
      let { code, status, message } = await deletebatchAssignment(
        req.params.id
      );
      return res.status(code).json({ status, message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
batchTeacher.get(
  "/assignment/:id",
  [validateToken, isTeacher],
  async (req: Request, res: Response) => {
    try {
      let { code, status, message } = await showAssignmentTeacher(
        req.params.id
      );
      return res.status(code).json({ status, message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);

// showAssignmentTeacher
batchTeacher.get(
  "/get/all/batches",
  [validateToken, isTeacher],
  async (req: Request, res: Response) => {
    try {
      const teacherId = req.userid;
      const { code, status, message } = await getAllTeacherBatches(teacherId);
      // console.log(message);
      return res.status(code).json({ status: status, message: message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);

batchTeacher.get(
  "/get/batch/students/:batch_id",
  [validateToken, isTeacher],
  async (req: Request, res: Response) => {
    try {
      if (!req.params.batch_id) {
        return res
          .status(422)
          .json({ status: "error", message: "batch id required" });
      }
      const teacherId = req.userid;
      const { code, status, message } = await getBatchAllStudent(
        teacherId,
        req.params.batch_id
      );
      // console.log(message);
      return res.status(code).json({ status: status, message: message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);

batchTeacher.get(
  "/get/batch/:id",
  [validateToken, isTeacher],
  async (req: Request, res: Response) => {
    try {
      const { code, status, message } = await getBatchById(req.params.id);
      return res.status(code).json({ status: status, message: message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
