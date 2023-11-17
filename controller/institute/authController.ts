import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  getInstitute,
  getInstitutePassword,
} from "../../model/institute/institute";
import { getStudentByEmail } from "../../model/student/student";

export const loginInstitue = async (email: string, password: string) => {
  try {
    const { code, status, message } = await getInstitute("email", email);
    if (status === "error") {
      return { code, status, message };
    }
    let passwords = await getInstitutePassword(message?.id);
    let checkPassword = bcrypt.compareSync(
      password,
      passwords?.message?.password
    );
    if (!checkPassword) {
      return { code: 401, status: "error", message: "incorrect password" };
    }
    let key: string = process.env.APP_KEY!;
    let createtoken = jwt.sign({ userid: message.id, role: "institute" }, key, {
      expiresIn: "7d",
    });
    return {
      code: 200,
      status: "success",
      message: "user logged in",
      token: createtoken,
    };
  } catch (e: any) {
    return { code: 500, status: "error", message: e.message };
  }
};

export const loginStudent = async (email: string, password: string) => {
  try {
    const { code, status, message } = await getStudentByEmail(email);
    if (status === "error") {
      return { code, status, message };
    }
    let passwords = message?.password;
    let checkPassword = bcrypt.compareSync(password, passwords);
    if (!checkPassword) {
      return { code: 401, status: "error", message: "incorrect password" };
    }

    let key: string = process.env.APP_KEY!;
    let createtoken = jwt.sign({ userid: message.id, role: "student" }, key, {
      expiresIn: "7d",
    });
    return {
      code: 200,
      status: "success",
      message: "user logged in",
      token: createtoken,
    };
  } catch (e: any) {
    return { code: 500, status: "error", message: e.message };
  }
};
