import { Request, Response, Router } from "express";
import {
  commonAccess,
  isInstitute,
  validateToken,
} from "../../middleware/authMiddleware";
import {
  StatusUpdateEvent,
  createBulkEvent,
  createEvent,
  deleteStatus,
  getActiveEvents,
  getAllEvents,
  getUpdateevnets,
} from "../../model/public/events";
import {
  InstituteDeleteSchema,
  InstituteUpdateStatusSchema,
  eventsCreateSchema,
} from "../../middleware/requestValidation";
import moment from "moment";

export const EventRoutes = Router();

EventRoutes.post(
  "/create",
  [validateToken, isInstitute],
  async (req: Request, res: Response) => {
    try {
      const reqError = eventsCreateSchema.validate(req.body);
      if (reqError?.error) {
        return res
          .status(422)
          .json({ status: "error", message: reqError.error?.message });
      }
      const institute = req.userid;
      const { name, category, isleave, date } = req.body;
      const { code, status, message } = await createEvent(
        name,
        category,
        isleave,
        institute,
        date
      );
      // console.log(message);
      return res.status(code).json({ status: status, message: message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);

EventRoutes.post(
  "/create/bulk",
  [validateToken, isInstitute],
  async (req: Request, res: Response) => {
    try {
      let instituteCode: any = req.userid;
      var data: any = req.body.data;
      if (!data) {
        return res
          .status(422)
          .json({ status: "error", message: "data required" });
      }
      var updatedData: any = [];
      if (data.length > 0) {
        data.map((item: any) => {
          updatedData.push({
            name: item.name,
            category: item.category,
            isleave: item.isleave,
            fk_institute_id: instituteCode,
            date: new Date(item.date),
            status: true,
          });
        });
      }
      if (data.length <= 0) {
        return res
          .status(422)
          .json({ status: "error", message: "data required" });
      }
      const { code, status, message } = await createBulkEvent(updatedData);
      return res.status(code).json({ status, message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);

EventRoutes.get(
  "/get/active",
  [validateToken, isInstitute],
  async (req: Request, res: Response) => {
    try {
      const insID: string = req.userid;
      const { code, status, message } = await getActiveEvents(insID);
      return res.status(code).json({
        status: status,
        message: message,
      });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
EventRoutes.get(
  "/get/all",
  [validateToken, isInstitute],
  async (req: Request, res: Response) => {
    try {
      const insID: string = req.userid;
      const { code, status, message } = await getAllEvents(insID);
      return res.status(code).json({
        status: status,
        message: message,
      });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
EventRoutes.get(
  "/get/update/event",
  [validateToken, commonAccess],
  async (req: Request, res: Response) => {
    try {
      //   let isInstitutes =
      const insID = req.userid;
      var date: any = req.query.date
        ? req.query.date
        : moment().format("yyyy-MM-DD");

      //   console.log(date);

      const { code, status, message } = await getUpdateevnets(insID, date);
      return res.status(code).json({
        status: status,
        message: message,
      });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);

EventRoutes.put(
  "/update/:id",
  [validateToken, isInstitute],
  async (req: Request, res: Response) => {
    try {
      const reqError = InstituteUpdateStatusSchema.validate({
        id: req.params.id,
        status: req.body.status,
      });
      if (reqError?.error) {
        return res
          .status(422)
          .json({ status: "error", message: reqError.error?.message });
      }
      const { code, status, message } = await StatusUpdateEvent(
        req.body.status,
        req.params.id
      );
      return res.status(200).json({ status, message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
EventRoutes.delete(
  "/delete/:id",
  [validateToken, isInstitute],
  async (req: Request, res: Response) => {
    try {
      const reqError = InstituteDeleteSchema.validate(req.params);
      if (reqError?.error) {
        return res
          .status(422)
          .json({ status: "error", message: reqError.error?.message });
      }
      const { code, status, message } = await deleteStatus(req.params.id);
      return res.status(200).json({ status, message });
    } catch (e: any) {
      return res.status(500).json({ status: "error", message: e.message });
    }
  }
);
