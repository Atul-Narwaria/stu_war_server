import {
  getTeacher,
  getTeacherPassword,
  getteacherById,
  updateteacherPassword,
} from "../../model/Teacher/Teacher";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginTeacher = async (email: string, password: string) => {
  try {
    let checkUser = await getTeacherPassword(email);
    if (checkUser.status == "error") {
      return {
        code: checkUser.code,
        status: checkUser.status,
        message: checkUser.message,
      };
    }
    let checkPassword = bcrypt.compareSync(
      password,
      checkUser.message?.password
    );
    if (!checkPassword) {
      return { code: 401, status: "error", message: "incorrect password" };
    }
    let key: string = process.env.APP_KEY!;
    let createtoken = jwt.sign(
      { userid: checkUser.message.id, role: "teacher" },
      key,
      {
        expiresIn: "7d",
      }
    );
    return {
      code: 200,
      status: "success",
      message: "teacher logged in",
      token: createtoken,
    };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};

export const resetPassword = async (id: string) => {
  try {
    const { code, status, message } = await getteacherById(id);
    if (status === "error") {
      return { code, status, message };
    }
    let maintancepassword: string = process?.env?.MAINTANCE_PASSWORD
      ? process?.env?.MAINTANCE_PASSWORD
      : "12345678";
    const update: any = await updateteacherPassword(
      id,
      bcrypt.hashSync(maintancepassword, 10)
    );
    return {
      code: update.code,
      status: update.status,
      message: update.message,
    };
  } catch (e: any) {
    return { code: 500, status: "error", message: e.message };
  }
};
