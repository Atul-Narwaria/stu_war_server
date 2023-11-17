import { Request, Response, Router } from "express";
import { AdminLogin } from "../../middleware/requestValidation";
import { loginTeacher } from "../../controller/teacher/Teacher.controller";
import { isInstitute, validateToken } from "../../middleware/authMiddleware";
import {
  getInstituteTeacher,
  getTeachersActive,
} from "../../model/Teacher/Teacher";

export const teacherRoutes = Router();

teacherRoutes.post("/registration", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password, dob, fkdesgination } = req.body;
    //   const reqError = SalesTeamRegistrationSchema.validate(req.body);
    //   if(reqError?.error){
    //     return res.status(200).json({status:"error", message:reqError.error?.message});
    //   }
    //   return res.status(200).json(await RegisterSalesTeam(name,email,phone,password,dob,fkdesgination))
  } catch (e: any) {
    return res.status(500).json({ status: "error", message: e.message });
  }
});
teacherRoutes.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { error, value } = AdminLogin.validate(req.body);
    if (error) {
      return res.status(200).json({ status: "error", message: error?.message });
    }
    let { code, status, message, token } = await loginTeacher(email, password);
    return res.status(code).json({ status, message, token, role: "teacher" });
  } catch (e: any) {
    return res.status(500).json({ status: "error", message: e.message });
  }
});
teacherRoutes.get(
  "/get/Active",
  [validateToken, isInstitute],
  async (req: Request, res: Response) => {
    try {
      const page: any = req.query.page || 1;
      const insID: string = req.userid;
      const { code, status, message, totalPage, totalRow } =
        await getTeachersActive(page, insID);
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
teacherRoutes.get(
  "/get",
  [validateToken, isInstitute],
  async (req: Request, res: Response) => {
    try {
      const page: any = req.query.page || 1;
      const insID: string = req.userid;
      const { code, status, message, totalPage, totalRow } =
        await getInstituteTeacher(page, insID);
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
