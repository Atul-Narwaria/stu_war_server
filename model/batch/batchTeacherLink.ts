import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createBatchTeacherLink = async (
  fkTeacherId: string,
  fkBatchId: string
) => {
  try {
    let check = await prisma.batchTeacherLink.findFirst({
      where: {
        fk_batch_id: fkBatchId,
      },
    });
    if (!check) {
      await prisma.batchTeacherLink.create({
        data: {
          fk_batch_id: fkBatchId,
          fk_teacher_id: fkTeacherId,
        },
      });
    } else {
      await prisma.batchTeacherLink.updateMany({
        data: {
          fk_teacher_id: fkTeacherId,
        },
        where: {
          fk_batch_id: fkBatchId,
        },
      });
    }

    return {
      code: 200,
      status: "success",
      message: `teacher linked  successfully`,
    };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};

export const deleteBatchTeacherLink = async (id: string) => {
  try {
    await prisma.batchTeacherLink.delete({
      where: {
        id: id,
      },
    });
    return {
      code: 200,
      status: "success",
      message: `teacher linked deleted  successfully`,
    };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};

export const getTeacherFromBatch = async (batchId: string) => {
  try {
    return {
      code: 200,
      status: "success",
      message: await prisma.batchTeacherLink.findMany({
        select: {
          id: true,
          fk_teacher_id: true,
          teacherId: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
        where: {
          fk_batch_id: batchId,
        },
      }),
    };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};

export const getTotalteacherBatchCount = async (id: string) => {
  try {
    let check = await prisma.batchTeacherLink.count({
      where: {
        fk_teacher_id: id,
      },
    });
    return { code: 200, status: "success", message: check };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};
export const checkTodayRemainingBatch = async (id: string) => {
  try {
    let check = await prisma.batchTeacherLink.findMany({
      select: {
        id: true,
        batchId: {
          select: {
            id: true,
            name: true,
            start_time: true,
            end_time: true,
            weekdays: true,
            haveLiveClass: true,
            batchLiveClass: {
              select: {
                id: true,
                meeting_url: true,
                meeting_number: true,
                password: true,
              },
            },
            subCourses: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      where: {
        fk_teacher_id: id,
      },
    });
    return { code: 200, status: "success", message: check };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};

export const getAllStudentCount = async (id: string) => {
  try {
    // const
    const get = await prisma.batchTeacherLink.findMany({
      select: {
        id: true,
        batchId: {
          select: {
            batchLink: {
              select: {
                stundetmaster: {
                  select: {
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        fk_teacher_id: id,
      },
    });
    let count = 0;
    if (get.length <= 0) {
      return { code: 200, status: "success", message: 0 };
    }
    get.map((e: any) => {
      if (e?.batchId?.batchLink) {
        let batchLinkcount = e.batchId.batchLink.length;
        count = count + batchLinkcount;
      }
    });
    return { code: 200, status: "success", message: count };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};

export const getAllTeacherBatches = async (id: string) => {
  try {
    const get = await prisma.batchTeacherLink.findMany({
      select: {
        id: true,
        batchId: {
          select: {
            id: true,
            name: true,
            start_time: true,
            end_time: true,
            weekdays: true,
            haveLiveClass: true,
            batchLiveClass: {
              select: {
                id: true,
                meeting_url: true,
                meeting_number: true,
                password: true,
              },
            },
            subCourses: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      where: {
        fk_teacher_id: id,
      },
    });
    return { code: 200, status: "success", message: get };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};

export const getBatchAllStudent = async (id: string, batchid: string) => {
  try {
    // const
    const get = await prisma.batchTeacherLink.findMany({
      select: {
        id: true,
        batchId: {
          select: {
            batchLink: {
              select: {
                stundetmaster: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                  },
                },
              },
            },
          },
        },
      },
      where: {
        fk_teacher_id: id,
        fk_batch_id: batchid,
      },
    });

    return { code: 200, status: "success", message: get };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};
