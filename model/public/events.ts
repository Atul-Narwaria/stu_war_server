import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createEvent = async (
  name: string,
  category: string,
  isleave: boolean,
  fk_institute_id: string,
  date: string
) => {
  try {
    await prisma.events.create({
      data: {
        name: name,
        category: category,
        isleave: isleave,
        fk_institute_id: fk_institute_id,
        status: true,
        date: new Date(date),
      },
    });

    return {
      code: 200,
      status: "success",
      message: "event " + name + " is created successfully",
    };
  } catch (e: any) {
    return { code: 500, status: "error", message: e.message };
  }
};

export const createBulkEvent = async (data: any) => {
  try {
    await prisma.events.createMany({
      data: data,
      skipDuplicates: true,
    });
    return {
      code: 200,
      status: "success",
      message: "events created successfully",
    };
  } catch (e: any) {
    return { code: 500, status: "error", message: e.message };
  }
};

export const getActiveEvents = async (fk_institute_id: string) => {
  try {
    const get = await prisma.events.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        isleave: true,
        date: true,
      },
      where: {
        fk_institute_id: fk_institute_id,
        status: true,
      },
    });
    return {
      code: 200,
      status: "success",
      message: get,
    };
  } catch (e: any) {
    return { code: 500, status: "error", message: e.meta };
  }
};
export const getAllEvents = async (fk_institute_id: string) => {
  try {
    const get = await prisma.events.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        isleave: true,
        date: true,
        status: true,
      },
      where: {
        fk_institute_id: fk_institute_id,
      },
    });
    return {
      code: 200,
      status: "success",
      message: get,
    };
  } catch (e: any) {
    return { code: 500, status: "error", message: e.meta };
  }
};
export const getUpdateevnets = async (fk_institute_id: string, date: any) => {
  try {
    const get = await prisma.events.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        isleave: true,
        date: true,
        status: true,
      },
      where: {
        fk_institute_id: fk_institute_id,
        date: {
          gte: new Date(date),
        },
        status: true,
      },
    });
    return {
      code: 200,
      status: "success",
      message: get,
    };
  } catch (e: any) {
    return { code: 500, status: "error", message: e.message };
  }
};
export const StatusUpdateEvent = async (status: boolean, id: string) => {
  try {
    await prisma.events.update({
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
      message: "events status updated successfully",
    };
  } catch (e: any) {
    return { code: 500, status: "error", message: e.meta };
  }
};

export const deleteStatus = async (id: string) => {
  try {
    let check = await prisma.events.count({
      where: {
        id: id,
      },
    });
    if (!check) {
      return { status: "error", message: `event not found` };
    }
    await prisma.events.delete({
      where: {
        id: id,
      },
    });
    return {
      code: 200,
      status: "success",
      message: ` event  deleted successfully   `,
    };
  } catch (e: any) {
    return { code: 500, status: "error", message: e.meta };
  }
};
