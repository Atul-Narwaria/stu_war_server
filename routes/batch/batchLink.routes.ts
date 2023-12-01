import { Request, Response, Router } from "express";
import {
  isInstitute,
  isStudent,
  validateToken,
} from "../../middleware/authMiddleware";
import { instituteBatchLinkCreateSchema } from "../../middleware/requestValidation";
import {
  BatchStudentsSearch,
  createBatchBulkLink,
  createBatchLink,
  deleteBatchLink,
  getBatchDetailByStudent,
  getBatchFullDetailByStudent,
  getBatchStudents,
} from "../../model/batch/batchLink";
import {
  StudentBatchListDashboard,
  StudentTodayRemainingBatch,
} from "../../controller/batch/batchStudent/batchStudent.controller";
import { getTotalStudentBatchCount } from "../../model/batch/batchLiveClass";
import {
  getAssignmentListStudent,
  getAssignmentListStudentSearch,
} from "../../model/batch/assignmentStudent";
import { getBatchById } from "../../model/batch/batch";

export const batchLinkRoutes = Router();

batchLinkRoutes.post(
  "/create",
  [validateToken, isInstitute],
  async (req: Request, res: Response) => {
    try {
      const reqError = instituteBatchLinkCreateSchema.validate(req.body);
      if (reqError?.error) {
        return res
          .status(200)
          .json({ status: "error", message: reqError.error?.message });
      }
      let { code, status, message } = await createBatchLink(
        req.body,
        req.userid
      );
      return res.status(code).json({ status, message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);

batchLinkRoutes.post(
  "/create/bulk",
  [validateToken, isInstitute],
  async (req: Request, res: Response) => {
    try {
      if (!req.body || !req.body.data) {
        return res
          .status(200)
          .json({ status: "error", message: "data not found" });
      }
      let data: any = [];
      let bodyData = req.body.data;
      if (bodyData.length != 0) {
        bodyData.map((e: any) => {
          data.push({
            fk_institute_id: req.userid,
            fk_student_id: e.fk_student_id,
            fk_bacth_id: e.fk_batch_id,
            status: true,
          });
        });
      }
      if (data.length != 0) {
        let { code, status, message } = await createBatchBulkLink(data);
        return res.status(code).json({ status, message });
      }

      return res
        .status(422)
        .json({ status: "error", message: "something went wrong" });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);

batchLinkRoutes.delete(
  "/delete/:id",
  [validateToken, isInstitute],
  async (req: Request, res: Response) => {
    try {
      let { code, status, message } = await deleteBatchLink(req.params.id);
      return res.status(code).json({ status, message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);

batchLinkRoutes.get(
  "/get/all/:id",
  [validateToken, isInstitute],
  async (req: Request, res: Response) => {
    try {
      const page: any = req.query.page || 1;
      const insID: string = req.userid;
      if (!req.params.id) {
        return res
          .status(200)
          .json({ status: "error", message: "batch id not found" });
      }
      const { code, status, message, totalPage, totalRow } =
        await getBatchStudents(page, req.params.id, req.userid);
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
batchLinkRoutes.get(
  "/get/search/:id",
  [validateToken, isInstitute],
  async (req: Request, res: Response) => {
    try {
      const page: any = req.query.page || 1;
      const insID: string = req.userid;
      const query: any = req.query.query || null;
      const { code, status, message, totalPage, totalRow } =
        await BatchStudentsSearch(page, query, req.params.id, insID);
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
//
batchLinkRoutes.get(
  "/get/batch/remaning/count",
  [validateToken, isStudent],
  async (req: Request, res: Response) => {
    try {
      const studentId = req.userid;
      const { code, status, message } = await StudentTodayRemainingBatch(
        studentId
      );
      // console.log(message);
      return res.status(code).json({ status: status, message: message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
batchLinkRoutes.get(
  "/get/batch/count",
  [validateToken, isStudent],
  async (req: Request, res: Response) => {
    try {
      const teacherId = req.userid;
      const { code, status, message } = await getTotalStudentBatchCount(
        teacherId
      );
      // console.log(message);
      return res.status(code).json({ status: status, message: message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
batchLinkRoutes.get(
  "/get/batch",
  [validateToken, isStudent],
  async (req: Request, res: Response) => {
    try {
      const studentId = req.userid;
      const { code, status, message } = await StudentBatchListDashboard(
        studentId
      );
      // console.log(message);
      return res.status(code).json({ status: status, message: message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
batchLinkRoutes.get(
  "/get/batch/fulldetail/:id",
  [validateToken, isStudent],
  async (req: Request, res: Response) => {
    try {
      const { code, status, message } = await getBatchFullDetailByStudent(
        req.params.id
      );
      return res.status(code).json({ status: status, message: message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
batchLinkRoutes.get(
  "/get/batch/assignments/:id",
  [validateToken, isStudent],
  async (req: Request, res: Response) => {
    try {
      const page: any = req.query.page || 1;
      const userid: string = req.userid;
      const { code, status, message } = await getAssignmentListStudent(
        req.params.id,
        page,
        userid
      );
      return res.status(code).json({ status: status, message: message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
batchLinkRoutes.get(
  "/get/batch/assignments/:id",
  [validateToken, isStudent],
  async (req: Request, res: Response) => {
    try {
      const page: any = req.query.page || 1;
      const userid: string = req.userid;
      const query: any = req.query.query || null;
      const { code, status, message } = await getAssignmentListStudentSearch(
        req.params.id,
        page,
        userid,
        query
      );
      return res.status(code).json({ status: status, message: message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
batchLinkRoutes.get(
  "/get/batches",
  [validateToken, isStudent],
  async (req: Request, res: Response) => {
    try {
      const userid: string = req.userid;
      const { code, status, message } = await getBatchDetailByStudent(userid);
      return res.status(code).json({ status: status, message: message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);

batchLinkRoutes.get(
  "/get/batche/detail/:id",
  [validateToken, isStudent],
  async (req: Request, res: Response) => {
    try {
      const userid: string = req.userid;
      const { code, status, message } = await getBatchById(req.params.id);
      return res.status(code).json({ status: status, message: message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);

batchLinkRoutes.get(
  "/get/batch/:id",
  [validateToken, isStudent],
  async (req: Request, res: Response) => {
    try {
      const { code, status, message } = await getBatchById(req.params.id);
      return res.status(code).json({ status: status, message: message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
