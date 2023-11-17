import { Request, Response, Router } from "express";
import { AdminLogin, AdminRegistration } from "../middleware/requestValidation";
import { RegisterAdmin, loginAdmin } from "../controller/admin/Auth.controller";
import {
  loginInstitue,
  loginStudent,
} from "../controller/institute/authController";
import { getIpv4 } from "../helper/ip.helper";

export const AuthRoutes = Router();

AuthRoutes.post("/admin/registration", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password } = req.body;
    const reqError = AdminRegistration.validate(req.body);
    if (reqError?.error) {
      return res
        .status(200)
        .json({ status: "error", message: reqError.error?.message });
    }
    let { code, status, message } = await RegisterAdmin(
      name,
      email,
      phone,
      password
    );
    return res.status(code).json({ status, message });
  } catch (e: any) {
    return res.status(500).json({ status: "error", message: e.message });
  }
});
AuthRoutes.post("/admin/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { error, value } = AdminLogin.validate(req.body);
    if (error) {
      return res.status(200).json({ status: "error", message: error?.message });
    }
    let { code, status, message, token } = await loginAdmin(email, password);
    return res.status(code).json({ status, message, token, role: "admin" });
  } catch (e: any) {
    return res.status(500).json({ status: "error", message: e.message });
  }
});
AuthRoutes.post("/institute/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { error, value } = AdminLogin.validate(req.body);
    if (error) {
      return res.status(200).json({ status: "error", message: error?.message });
    }
    let { code, status, message, token } = await loginInstitue(email, password);
    return res.status(code).json({ status, message, token, role: "institute" });
  } catch (e: any) {
    return res.status(500).json({ status: "error", message: e.message });
  }
});
AuthRoutes.post("/student/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { error, value } = AdminLogin.validate(req.body);
    if (error) {
      return res.status(200).json({ status: "error", message: error?.message });
    }
    let { code, status, message, token } = await loginStudent(email, password);
    return res.status(code).json({ status, message, token, role: "student" });
  } catch (e: any) {
    return res.status(500).json({ status: "error", message: e.message });
  }
});
AuthRoutes.get("/ip", async (req: Request, res: Response) => {
  try {
    const get = await getIpv4();
    return res.status(200).json({ status: "success", message: get });
  } catch (e: any) {
    return res.status(500).json({ status: "error", message: e.message });
  }
});
