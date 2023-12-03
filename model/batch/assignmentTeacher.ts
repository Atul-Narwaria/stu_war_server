import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient();

export const createBatchAssignment = async (
  name: string,
  fk_teacher_id: string,
  fk_batch_id: string,
  contents: any,
  media: any,
  submission_date: string
) => {
  try {
    await prisma.batchAssignments.create({
      data: {
        name,
        fk_batch_id,
        fk_teacher_id,
        contents,
        media,
        submission_date: new Date(submission_date),
        assignment_date: new Date(moment().format("YYYY-MM-DD")),
      },
    });
    return {
      code: 200,
      status: "success",
      message: ` assignemnt created successfully`,
    };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: e.message };
  }
};

export const deletebatchAssignment = async (id: string) => {
  try {
    await prisma.batchAssignments.delete({
      where: {
        id: id,
      },
    });
    return {
      code: 200,
      status: "success",
      message: `assignment deleted successfully`,
    };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};

export const getBatchAssignments = async (
  fk_batch_id: string,
  fk_teacher_id: string,
  page: number
) => {
  try {
    const skip = (page - 1) * 10;
    let totalPage = await prisma.batchAssignments.count({
      where: {
        fk_batch_id,
        fk_teacher_id,
      },
    });
    let totalRow = totalPage;
    totalPage = Math.ceil(totalPage / 10);
    let data = await prisma.batchAssignments.findMany({
      select: {
        id: true,
        contents: true,
        submission_date: true,
        assignment_date: true,
        media: true,
        name: true,
        batchStudentsAssignment: {
          select: {
            id: true,
            fk_student_id: true,
          },
        },
        batchMaster: {
          select: {
            batchLink: {
              select: {
                id: true,
              },
            },
          },
        },
      },
      skip: skip,
      take: 10,
      orderBy: {
        createAt: "desc",
      },
      where: {
        fk_batch_id,
        fk_teacher_id,
      },
    });
    return {
      code: 200,
      status: "success",
      message: data,
      totalPage: totalPage,
      totalRow: totalRow,
    };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};

export const getBatchAssignmentsearch = async (
  fk_batch_id: string,
  fk_teacher_id: string,
  page: number,
  query: string
) => {
  try {
    const skip = (page - 1) * 10;
    let totalPage = await prisma.batchAssignments.count({
      where: {
        fk_batch_id,
        fk_teacher_id,
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
    let data = await prisma.batchAssignments.findMany({
      select: {
        id: true,
        contents: true,
        submission_date: true,
        assignment_date: true,
        media: true,
        name: true,
        batchStudentsAssignment: {
          select: {
            id: true,
            fk_student_id: true,
          },
        },
        batchMaster: {
          select: {
            batchLink: {
              select: {
                id: true,
              },
            },
          },
        },
      },
      skip: skip,
      take: 10,
      orderBy: {
        createAt: "desc",
      },
      where: {
        fk_batch_id,
        fk_teacher_id,
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
      message: data,
      totalPage: totalPage,
      totalRow: totalRow,
    };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};

export const getBatchAssignmentsCount = async (
  fk_batch_id: string,
  fk_teacher_id: string
) => {
  try {
    let totalPage = await prisma.batchAssignments.count({
      where: {
        fk_batch_id,
        fk_teacher_id,
      },
    });

    return {
      code: 200,
      status: "success",
      message: totalPage,
    };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};
export const showAssignmentTeacher =async (id:string) => {
    try{
      let get = await prisma.batchAssignments.findFirst({
        where:{
          id:id
        }
      })
      return {
        code: 200,
        status: "success",
        message: get,
      };
    }catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
}

export const getSubmittedAssignemnt = async (id:string) => {
    try{
      let  get =await prisma.batchStudentsAssignment.findMany({
        select:{
          id:true,
          media:true,
          contents:true,
          studenntMaster:{
            select:{
              id:true,
              firstName:true,
              lastName:true,
              email:true,
              phone:true
            }
          },
          batchAssignemnt:{
            select:{
              id:true,
              name:true,
            }
          }
        }
      })
    }catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
}