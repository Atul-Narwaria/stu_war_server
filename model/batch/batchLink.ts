import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createBatchLink = async (
  data: {
    fk_student_id: string;
    fk_batch_id: string;
  },
  fk_institute_id: string
) => {
  try {
    await prisma.batchLink.create({
      data: {
        fk_institute_id: fk_institute_id,
        fk_student_id: data.fk_student_id,
        fk_bacth_id: data.fk_batch_id,
        status: true,
      },
    });
    return {
      code: 200,
      status: "success",
      message: ` student linked successfully`,
    };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};

export const createBatchBulkLink = async (datas: any) => {
  try {
    await prisma.batchLink.createMany({
      data: datas,
      skipDuplicates: true,
    });
    return {
      code: 200,
      status: "success",
      message: ` students linked successfully`,
    };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};

export const deleteBatchLink = async (id: string) => {
  try {
    await prisma.batchLink.delete({
      where: {
        id: id,
      },
    });
    return {
      code: 200,
      status: "success",
      message: `students linked deleted successfully`,
    };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};

export const getBatchStudents = async (
  page: number,
  batchId: string,
  insID: string
) => {
  try {
    const skip = (page - 1) * 10;
    let totalPage = await prisma.batchLink.count({
      where: {
        fk_institute_id: insID,
        fk_bacth_id: batchId,
      },
    });
    let totalRow = totalPage;
    totalPage = Math.ceil(totalPage / 10);
    return {
      code: 200,
      status: "success",
      message: await prisma.batchLink.findMany({
        select: {
          id: true,
          fk_student_id: true,
          fk_bacth_id: true,
          status: true,
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
        where: {
          fk_institute_id: insID,
          fk_bacth_id: batchId,
        },
        skip: skip,
        take: 10,
        orderBy: {
          updatedAt: "desc",
        },
      }),
      totalPage: totalPage,
      totalRow: totalRow,
    };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};

export const BatchStudentsSearch = async (
  page: number,
  query: string,
  batchId: any,
  insID: string
) => {
  try {
    const skip = (page - 1) * 10;
    let totalPage = await prisma.batchLink.count({
      where: {
        fk_institute_id: insID,
        fk_bacth_id: batchId,
        OR: [
          {
            stundetmaster: {
              OR: [
                {
                  firstName: {
                    contains: query,
                  },
                },
                {
                  lastName: {
                    contains: query,
                  },
                },
                {
                  email: {
                    contains: query,
                  },
                },
                {
                  phone: {
                    contains: query,
                  },
                },
              ],
            },
          },
        ],
      },
    });
    let totalRow = totalPage;
    totalPage = Math.ceil(totalPage / 10);
    return {
      code: 200,
      status: "success",
      message: await prisma.batchLink.findMany({
        select: {
          id: true,
          fk_student_id: true,
          fk_bacth_id: true,
          status: true,
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
        skip: skip,
        take: 10,
        where: {
          fk_institute_id: insID,
          fk_bacth_id: batchId,
          OR: [
            {
              stundetmaster: {
                OR: [
                  {
                    firstName: {
                      contains: query,
                    },
                  },
                  {
                    lastName: {
                      contains: query,
                    },
                  },
                  {
                    email: {
                      contains: query,
                    },
                  },
                  {
                    phone: {
                      contains: query,
                    },
                  },
                ],
              },
            },
          ],
        },
      }),
      totalPage: totalPage,
      totalRow: totalRow,
    };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};

export const getBatchDetailByStudent = async (id: string) => {
  try {
    const get = await prisma.batchLink.findMany({
      select: {
        id: true,
        bactch: {
          select: {
            name: true,
            end_time: true,
            start_time: true,
            weekdays: true,
          },
        },
      },
      where: {
        fk_student_id: id,
      },
    });
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};

export const StudentheckTodayRemainingBatch = async (id: string) => {
  try {
    let check = await prisma.batchLink.findMany({
      select: {
        id: true,
        bactch: {
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
