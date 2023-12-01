import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient();

export const getStudentByEmail = async (email: string) => {
  try {
    console.log(email);
    const get = await prisma.studentMaster.findFirst({
      where: {
        email: email,
      },
    });
    if (!get) {
      return {
        code: 403,
        status: "success",
        message: "email not found",
      };
    }
    return {
      code: 200,
      status: "success",
      message: get,
    };
  } catch (prismaError: any) {
    return { code: 500, status: "error", message: prismaError.message };
  }
};

export const createStudentWithAddress = async (data: {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  dob: Date;
  gender: string;
  admissionId: string;
  profileImg: string;
  country: string;
  state: string;
  city: string;
  address: string;
  pin: string;
  instituteId: string;
}) => {
  try {
    await prisma.studentMaster.create({
      data: {
        firstName: data.firstname,
        lastName: data.lastname,
        email: data.email,
        phone: data.phone,
        password: data.password,
        dob: new Date(data.dob),
        gender: data.gender,
        admissionId: data.admissionId,
        profileImg: data.profileImg,
        fk_institute_id: data.instituteId,
        studentAddress: {
          create: {
            fkcountryId: data.country,
            fkstateId: data.state,
            fkcityId: data.city,
            Address: data.address,
            pin: data.pin,
          },
        },
      },
    });
    return {
      code: 200,
      status: "success",
      message: "student created successfully",
    };
  } catch (prismaError: any) {
    return { code: 500, status: "error", message: prismaError.message };
  }
};

export const createBulkStudent = async (bulkData: any) => {
  try {
    await prisma.studentMaster.createMany({
      data: bulkData,
      skipDuplicates: true,
    });
    return {
      code: 200,
      status: "success",
      message: "student created successfully",
    };
  } catch (prismaError: any) {
    return { code: 500, status: "error", message: prismaError.message };
  }
};

export const getstundet = async (id: string) => {
  try {
    return {
      code: 200,
      status: "success",
      message: await prisma.studentMaster.findFirst({
        select: {
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          dob: true,
          gender: true,
          studentAddress: {
            select: {
              fkcityId: true,
              fkcountryId: true,
              fkstateId: true,
              Address: true,
              pin: true,
            },
          },
        },
        where: {
          id: id,
        },
      }),
    };
  } catch (prismaError: any) {
    return { code: 500, status: "error", message: prismaError.message };
  }
};
export const editStudent = async (data: {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  dob: Date;
  profileImg: string;
}) => {
  try {
    await prisma.studentMaster.update({
      data: {
        firstName: data.firstname,
        lastName: data.lastname,
        email: data.email,
        phone: data.phone,
        dob: data.dob,
        profileImg: data.profileImg,
      },
      where: {
        id: data.id,
      },
    });
    return { status: "success", message: ` student updated` };
  } catch (prismaError: any) {
    return { status: "error", message: prismaError.message };
  }
};

export const editStudentAddress = async (data: {
  studentId: string;
  country: string;
  state: string;
  city: string;
  address: string;
  pin: string;
  id: string;
}) => {
  try {
    let user: any = await getstundet(data.studentId);
    if (!user) {
      return { status: "error", message: `student not found` };
    }
    await prisma.studentAddress.update({
      data: {
        fkstateId: data.state,
        fkcityId: data.city,
        Address: data.address,
        pin: data.pin,
      },
      where: {
        id: data.id,
      },
    });
    return {
      status: "success",
      message: `${user.firstname} ${user.lastname}   student address updated`,
    };
  } catch (prismaError: any) {
    return { status: "error", message: prismaError.message };
  }
};

export const StudentStatusUpdate = async (id: string, status: boolean) => {
  try {
    let user: any = await getstundet(id);
    if (!user) {
      return { status: "error", message: `student not found` };
    }
    await prisma.studentMaster.update({
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
      message: `${user.message?.firstName} ${user.message?.lastName}   student status  updated`,
    };
  } catch (prismaError: any) {
    return { code: 500, status: "error", message: prismaError.message };
  }
};

export const studentDelete = async (id: string) => {
  try {
    let user: any = await getstundet(id);
    if (!user) {
      return { status: "error", message: `student not found` };
    }
    await prisma.studentMaster.delete({
      where: {
        id: id,
      },
    });
    return {
      code: 200,
      status: "success",
      message: `${user.message.firstName} ${user.message.lastName}   student delete   `,
    };
  } catch (prismaError: any) {
    return { code: 500, status: "error", message: prismaError.message };
  }
};

export const getstudentAddmissionIds = async (id: string) => {
  try {
    return {
      code: 200,
      status: "success",
      message: await prisma.studentMaster.findMany({
        select: {
          admissionId: true,
        },
        where: {
          admissionId: {
            contains: id,
          },
        },
      }),
    };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};
export const getInstituteStudents = async (page: number, insID: string) => {
  try {
    const skip = (page - 1) * 10;
    let totalPage = await prisma.studentMaster.count({
      where: {
        fk_institute_id: insID,
      },
    });
    let totalRow = totalPage;
    totalPage = Math.ceil(totalPage / 10);
    return {
      code: 200,
      status: "success",
      message: await prisma.studentMaster.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          gender: true,
          dob: true,
          admissionId: true,
          status: true,
          createAt: true,
        },
        skip: skip,
        take: 10,
        where: {
          fk_institute_id: insID,
        },
        orderBy: {
          createAt: "desc",
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

export const getInstituteStudentsActive = async (
  page: number,
  insID: string
) => {
  try {
    const skip = (page - 1) * 10;
    let totalPage = await prisma.studentMaster.count({
      where: {
        fk_institute_id: insID,
        status: true,
      },
    });
    let totalRow = totalPage;
    totalPage = Math.ceil(totalPage / 10);
    return {
      code: 200,
      status: "success",
      message: await prisma.studentMaster.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          createAt: true,
        },
        skip: skip,
        take: 10,
        where: {
          fk_institute_id: insID,
          status: true,
        },
        orderBy: {
          createAt: "desc",
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

export const InstituteStudentSeach = async (
  page: number,
  query: string,
  insID: string
) => {
  try {
    const skip = (page - 1) * 10;
    let totalPage = await prisma.studentMaster.count({
      where: {
        fk_institute_id: insID,
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
    });
    let totalRow = totalPage;
    totalPage = Math.ceil(totalPage / 10);
    return {
      code: 200,
      status: "success",
      message: await prisma.studentMaster.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          gender: true,
          dob: true,
          admissionId: true,
          status: true,
          createAt: true,
          updatedAt: true,
        },
        skip: skip,
        take: 10,
        where: {
          fk_institute_id: insID,
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
            {
              gender: {
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

export const editInstituteStudent = async (
  userid: string,
  data: {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    dob: Date;
    gender: string;
    country: string;
    state: string;
    city: string;
    address: string;
    pin: string;
  }
) => {
  try {
    await prisma.studentMaster.update({
      data: {
        firstName: data.firstname,
        lastName: data.lastname,
        email: data.email,
        phone: data.phone,
        dob: new Date(data.dob),
        gender: data.gender,
        studentAddress: {},
      },
      where: {
        id: userid,
      },
    });
    await prisma.studentAddress.upsert({
      where: {
        fkStudentId: userid,
      },
      update: {
        fkcountryId: data.country,
        fkstateId: data.state,
        fkcityId: data.city,
        Address: data.address,
        pin: data.pin,
      },
      create: {
        fkcountryId: data.country,
        fkstateId: data.state,
        fkcityId: data.city,
        Address: data.address,
        pin: data.pin,
        fkStudentId: userid,
      },
    });
    return { code: 200, status: "success", message: "student updated" };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[0] };
  }
};

export const getstudentsByDate = async (
  page: number,
  insID: string,
  startDate: string,
  endDate?: string
) => {
  try {
    let enddate: any = endDate;
    if (!endDate) {
      enddate = moment().add(1, "days");
    } else {
      enddate = moment(endDate, "YYYY-MM-DD").add(1, "days");
    }
    const skip = (page - 1) * 10;
    let totalPage = await prisma.studentMaster.count({
      where: {
        fk_institute_id: insID,
        createAt: {
          lte: new Date(enddate),
          gte: new Date(startDate),
        },
      },
    });
    let totalRow = totalPage;
    totalPage = Math.ceil(totalPage / 10);
    return {
      code: 200,
      status: "success",
      message: await prisma.studentMaster.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          gender: true,
          dob: true,
          admissionId: true,
          status: true,
          createAt: true,
        },
        skip: skip,
        take: 10,
        where: {
          fk_institute_id: insID,
          createAt: {
            lte: new Date(enddate),
            gte: new Date(startDate),
          },
        },
        orderBy: {
          createAt: "desc",
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

export const isStudentExist = async (id: string) => {
  try {
    const find = await prisma.studentMaster.count({
      where: {
        OR: [
          {
            id: id,
          },
          {
            email: id,
          },
        ],
      },
    });
    return {
      code: 200,
      status: "success",
      message: find,
    };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[1] };
  }
};
export const getStudentInstituteId = async (id: string) => {
  try {
    const get = await prisma.studentMaster.findFirst({
      select: {
        fk_institute_id: true,
      },
      where: {
        id: id,
        status: true,
      },
    });
    if (!get) {
      return { code: 403, status: "error", message: "invalid user" };
    }

    return { code: 200, status: "success", message: get.fk_institute_id };
  } catch (e: any) {
    let split = e.message.split(".");
    split = split.slice(-2);
    return { code: 500, status: "error", message: split[1] };
  }
};
