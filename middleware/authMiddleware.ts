import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CheckAdminExistance } from "../model/admin/admin";
import { CheckinstituteExistance } from "../model/institute/institute";
import {
  getTeacherInstituteId,
  isTeacherExist,
} from "../model/Teacher/Teacher";
import {
  getStudentInstituteId,
  isStudentExist,
} from "../model/student/student";

const secret_key: string = process.env.APP_KEY!;

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }
  try {
    const decode: any = jwt.verify(token, secret_key);
    req.userid = decode.userid;
    req.role = decode.role;
    next();
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let id: string = req.userid;
  console.log(req.userid);
  if (!id) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const check = await CheckAdminExistance(id);
  console.log(check);
  if (check == 0) {
    return res.status(401).json({ message: "Admin role required" });
  }
  next();
};
export const isInstitute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let id: string = req.userid;
  if (!id) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const check = await CheckinstituteExistance(id);
  console.log(check);
  if (check == 0) {
    return res.status(401).json({ message: "institute role required" });
  }
  next();
};
export const isTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let id: string = req.userid;
  console.log(req.userid);
  if (!id) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const check: any = await isTeacherExist(id);
  if (check.message == 0) {
    return res.status(401).json({ message: "teacher role required" });
  }
  next();
};
export const isStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let id: string = req.userid;
  console.log(req.userid);
  if (!id) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const check: any = await isStudentExist(id);
  if (check.message == 0) {
    return res.status(401).json({ message: "teacher role required" });
  }
  next();
};
export const commonAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let role: string = req.role;
  if (role === "institute") {
    req.userid = req.userid;
  } else if (role === "teacher") {
    let id: any = await getTeacherInstituteId(req.userid);
    req.userid = id.message;
  } else if (role === "student") {
    let id: any = await getStudentInstituteId(req.userid);
    req.userid = id.message;
  }
  next();
};
