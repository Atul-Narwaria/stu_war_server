import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createLiveClass = async (
  topic: any,
  start_time: any,
  duration: any,
  password: any,
  meeting_url: any,
  fk_batch_id: any,
  meeting_number: any
) => {
  try {
    await prisma.batchLiveClass.create({
      data: {
        topic: topic,
        start_time: start_time,
        duration: duration.toString(),
        password: password,
        meeting_url: meeting_url,
        fk_batch_id: fk_batch_id,
        meeting_number: meeting_number,
      },
    });
    return {
      code: 200,
      status: "success",
      message: ` meeting created successfully`,
    };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: e.message };
  }
};

export const deleteBatchLiveClass = async (id: string) => {
  try {
    await prisma.batchLiveClass.delete({
      where: {
        id: id,
      },
    });
    return {
      code: 200,
      status: "success",
      message: ` meeting deleted successfully`,
    };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};

export const getCheckMeeting = async (id: string) => {
  try {
    let check = await prisma.batchLiveClass.count({
      where: {
        fk_batch_id: id,
      },
    });
    return {
      code: 200,
      status: "success",
      message: check,
    };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};

export const updateStatusBatchLiveClass = async (
  id: string,
  status: boolean
) => {
  try {
    let update = await prisma.batchMaster.update({
      data: {
        haveLiveClass: status,
      },
      where: {
        id: id,
      },
    });
    if (!update) {
      return {
        code: 500,
        status: "error",
        message: "]server error",
      };
    }
    return {
      code: 200,
      status: "success",
      message: "live class status updated",
    };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};

export const getTotalStudentBatchCount = async (id: string) => {
  try {
    let check = await prisma.batchLink.count({
      where: {
        fk_student_id: id,
      },
    });
    return { code: 200, status: "success", message: check };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};
