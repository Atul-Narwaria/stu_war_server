import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const createStudentWithAddress = async (data: {
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    password: string,
    dob: Date,
    gender: string,
    admissionId: string,
    profileImg: string,
    country: string,
    state: string,
    city: string,
    address: string,
    pin: string
    instituteId: string
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
                        pin: data.pin
                    }
                }
            }
        })
        return { code: 200, status: "success", message: "student created successfully" }
    } catch (prismaError: any) {
        return { code: 500, status: "error", message: prismaError.message }
    }
}
export const getstundet = async (id: string) => {

    try {

        return {
            code: 200, status: "success",
            message: await prisma.studentMaster.findFirst({
                select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                    dob: true,

                },
                where: {
                    id: id
                }
            })
        }
    } catch (prismaError: any) {
        return { status: "error", message: prismaError.message }
    }
}
export const editStudent = async (data: {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    dob: Date,
    profileImg: string,
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
                id: data.id
            }
        })
        return { status: "success", message: `${data.firstname} ${data.lastname}   student updated` }
    } catch (prismaError: any) {
        return { status: "error", message: prismaError.message }
    }
}

export const editStudentAddress = async (data: {
    studentId: string,
    country: string,
    state: string,
    city: string,
    address: string,
    pin: string,
    id: string
}) => {
    try {
        let user: any = await getstundet(data.studentId);
        if (!user) {
            return { status: "error", message: `student not found` }
        }
        await prisma.studentAddress.update({
            data: {
                fkstateId: data.state,
                fkcityId: data.city,
                Address: data.address,
                pin: data.pin
            },
            where: {
                id: data.id
            }
        })
        return { status: "success", message: `${user.firstname} ${user.lastname}   student address updated` }
    } catch (prismaError: any) {
        return { status: "error", message: prismaError.message }
    }
}

export const StudentStatusUpdate = async (id: string, status: boolean) => {
    try {
        let user: any = await getstundet(id);
        if (!user) {
            return { status: "error", message: `student not found` }
        }
        await prisma.studentMaster.update({
            data: {
                status: status
            },
            where: {
                id: id
            }
        })
        return { status: "success", message: `${user.firstname} ${user.lastname}   student status  updated` }
    } catch (prismaError: any) {
        return { status: "error", message: prismaError.message }
    }
}

export const studentDelete = async (id: string) => {
    try {
        let user: any = await getstundet(id);
        if (!user) {
            return { status: "error", message: `student not found` }
        }
        await prisma.studentMaster.delete({
            where: {
                id: id
            }
        })
        return { status: "success", message: `${user.firstname} ${user.lastname}   student delete   ` }
    } catch (prismaError: any) {
        return { status: "error", message: prismaError.message }
    }
}

export const getstudentAddmissionIds = async (id: string) => {
    try {

        return {
            code: 200, status: "success",
            message: await prisma.studentMaster.findMany({
                select: {
                    admissionId: true
                },
                where: {
                    admissionId: {
                        contains: id
                    }
                }
            })
        }
    } catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    }
}
export const getStudents = async () => {
    try {
        return {
            code: 200, status: "success", message: await prisma.studentMaster.findMany()
        }
    } catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    }
}