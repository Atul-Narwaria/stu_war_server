import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAssignmentListStudent = async (
  batchid: string,
  page: number,
  userid: string
) => {
  try {
    const skip = (page - 1) * 10;
    let totalPage = await prisma.batchAssignments.count({
      where: {
        fk_batch_id: batchid,
      },
    });
    let totalRow = totalPage;
    totalPage = Math.ceil(totalPage / 10);

    const get = await prisma.batchAssignments.findMany({
      select: {
        id: true,
        name: true,
        media: true,
        contents: true,
        submission_date: true,
        assignment_date: true,
        batchStudentsAssignment: {
          select: {
            id: true,
            media: true,
            contents: true,
            submission_date: true,
          },
          where: {
            fk_student_id: userid,
          },
        },
      },
      skip: skip,
      take: 10,
      where: {
        fk_batch_id: batchid,
      },
    });
    return {
      code: 200,
      status: "success",
      message: get,
      totalPage: totalPage,
      totalRow: totalRow,
    };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: e.message };
  }
};

export const getAssignmentListStudentSearch = async (
  batchid: string,
  page: number,
  userid: string,
  query: string
) => {
  try {
    const skip = (page - 1) * 10;
    let totalPage = await prisma.batchAssignments.count({
      where: {
        fk_batch_id: batchid,
        OR: [
          {
            name: {
              contains: query,
            },
          },
        ],
      },
    });
    let totalRow = totalPage;
    totalPage = Math.ceil(totalPage / 10);

    const get = await prisma.batchAssignments.findMany({
      select: {
        id: true,
        name: true,
        media: true,
        contents: true,
        submission_date: true,
        assignment_date: true,
        batchStudentsAssignment: {
          select: {
            id: true,
            media: true,
            contents: true,
            submission_date: true,
          },
          where: {
            fk_student_id: userid,
          },
        },
      },
      skip: skip,
      take: 10,
      where: {
        fk_batch_id: batchid,
        OR: [
          {
            name: {
              contains: query,
            },
          },
        ],
      },
    });
    return {
      code: 200,
      status: "success",
      message: get,
      totalPage: totalPage,
      totalRow: totalRow,
    };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: e.message };
  }
};

export const createBatchStudentAsignment = async (
  fk_student_id: string,
  contents: string,
  submission_date: any,
  media: string,
  fk_batch_assignment_id: string
) => {
  try {
    await prisma.batchStudentsAssignment.create({
      data: {
        fk_student_id,
        contents,
        submission_date: new Date(submission_date),
        media,
        fk_batch_assignment_id,
      },
    });
    return {
      code: 200,
      status: "success",
      message: "assignment uploaded successfully",
    };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: e.message };
  }
};
