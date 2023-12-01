import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createBatch = async (
  data: {
    fk_course_id: string;
    name: string;
    end_time: string;
    weekdays: string;
    start_time: string;
  },
  fk_institute_id: string
) => {
  try {
    await prisma.batchMaster.create({
      data: {
        fk_sub_course_id: data.fk_course_id,
        fk_institute_id: fk_institute_id,
        name: data.name,
        start_time: data.start_time,
        end_time: data.end_time,
        weekdays: data.weekdays,
        status: true,
      },
    });
    return {
      code: 200,
      status: "success",
      message: `${data.name} course created successfully`,
    };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};
export const updateBatchStatus = async (id: string, status: boolean) => {
  try {
    await prisma.batchMaster.update({
      data: {
        status: status,
      },
      where: {
        id: id,
      },
    });
    return {
      code: 200,
      status: "success",
      message: ` batch updated successfully`,
    };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};
export const getActiveBatch = async (instituteId: string) => {
  try {
    return {
      code: 200,
      status: "success",
      message: await prisma.batchMaster.findMany({
        where: {
          status: true,
          fk_institute_id: instituteId,
        },
      }),
    };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};
export const getAllbatch = async (page: number, instituteId: string) => {
  try {
    const skip = (page - 1) * 10;
    let totalPage = await prisma.batchMaster.count({
      where: {
        fk_institute_id: instituteId,
      },
    });
    let totalRow = totalPage;
    totalPage = Math.ceil(totalPage / 10);
    return {
      code: 200,
      status: "success",
      message: await prisma.batchMaster.findMany({
        select: {
          id: true,
          name: true,
          start_time: true,
          end_time: true,
          haveLiveClass: true,
          weekdays: true,
          status: true,
          subCourses: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        where: {
          fk_institute_id: instituteId,
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
export const deleteBatch = async (id: string) => {
  try {
    await prisma.batchMaster.delete({
      where: {
        id: id,
      },
    });
    return {
      code: 200,
      status: "success",
      message: `batch deleted successfully`,
    };
  } catch (e: any) {
    return { code: 200, status: "error", message: e.message };
  }
};
export const editBatch = async (
  data: {
    fk_course_id: string;
    name: string;
    end_time: string;
    weekdays: string;
    start_time: string;
  },
  batch_id: string
) => {
  try {
    await prisma.batchMaster.update({
      data: {
        fk_sub_course_id: data.fk_course_id,
        name: data.name,
        start_time: data.start_time,
        end_time: data.end_time,
        weekdays: data.weekdays,
      },
      where: {
        id: batch_id,
      },
    });
    return {
      code: 200,
      status: "success",
      message: ` Batch updated successfully`,
    };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};

export const InstituteBatchSeach = async (
  page: number,
  query: string,
  insID: string
) => {
  try {
    const skip = (page - 1) * 10;
    let totalPage = await prisma.batchMaster.count({
      where: {
        fk_institute_id: insID,
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
    return {
      code: 200,
      status: "success",
      message: await prisma.batchMaster.findMany({
        select: {
          id: true,
          name: true,
          start_time: true,
          end_time: true,
          haveLiveClass: true,
          status: true,
          weekdays: true,
          subCourses: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        skip: skip,
        take: 10,
        where: {
          fk_institute_id: insID,
          OR: [
            {
              name: {
                contains: query,
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
export const getBatchById = async (id: string) => {
  try {
    const get = await prisma.batchMaster.findFirst({
      where: {
        id: id,
      },
    });
    if (!get) {
      return { code: 422, status: "error", message: "batch not found" };
    }

    return {
      code: 200,
      status: "success",
      message: get,
    };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};
export const getAllBatchWithliveClass = async () => {
  try {
    let get = await prisma.batchMaster.findMany({
      select: {
        id: true,
        name: true,
        start_time: true,
        haveLiveClass: true,
        end_time: true,
        weekdays: true,
      },
      where: {
        haveLiveClass: true,
        status: true,
      },
    });
    return {
      code: 200,
      status: "success",
      message: get,
    };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};


