import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const createTeacherWithAddress = async (data: {
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    password: string,
    dob: Date,
    gender: string,
    profileImg: string,
    country: string,
    state: string,
    city: string,
    address: string,
    pin: string
    instituteId: string
}) => {
    try {
        await prisma.teacherMaster.create({
            data: {
                firstName: data.firstname,
                lastName: data.lastname,
                email: data.email,
                phone: data.phone,
                password: data.password,
                dob: new Date(data.dob),
                gender: data.gender,
                profileImg: data.profileImg,
                fk_institute_id: data.instituteId,
                teacherAddress: {
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
        return { code: 200, status: "success", message: "teacher created successfully" }
    } catch (prismaError: any) {
        return { code: 500, status: "error", message: prismaError.message }
    }
}

export const createBulkTeacher = async (bulkData: any) => {
    try {
        console.log(bulkData)
        await prisma.teacherMaster.createMany({
            data: bulkData,
            skipDuplicates: true,
        })
        return { code: 200, status: "success", message: "teacher created successfully" }
    } catch (prismaError: any) {
        return { code: 500, status: "error", message: prismaError.message }
    }
}

export const getTeacher = async (id: string) => {

    try {

        return {
            code: 200, status: "success",
            message: await prisma.teacherMaster.findFirst({
                select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                    dob: true,
                    gender:true,
                    teacherAddress:{
                        select:{
                           fkcityId:true,
                           fkcountryId:true,
                           fkstateId:true,
                           Address:true,
                           pin:true
                        }
                    }

                },
                where: {
                    id: id
                }
            })
        }
    } catch (prismaError: any) {
        return {code:500, status: "error", message: prismaError.message }
    }
}
export const editTeachert = async (data: {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    dob: Date,
    profileImg: string,
}) => {
    try {
        await prisma.teacherMaster.update({
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
        return { status: "success", message: ` teacher updated` }
    } catch (prismaError: any) {
        return { status: "error", message: prismaError.message }
    }
}

export const editTeacherAddress = async (data: {
    studentId: string,
    country: string,
    state: string,
    city: string,
    address: string,
    pin: string,
    id: string
}) => {
    try {
        let user: any = await getTeacher(data.studentId);
        if (!user) {
            return { status: "error", message: `student not found` }
        }
        await prisma.teacherAddress.update({
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
        return { status: "success", message: `${user.firstname} ${user.lastname}   teacher address updated` }
    } catch (prismaError: any) {
        return { status: "error", message: prismaError.message }
    }
}

export const TeacherStatusUpdate = async (id: string, status: boolean) => {
    try {
        let user: any = await getTeacher(id);
        if (!user) {
            return { status: "error", message: `teacher not found` }
        }
        await prisma.teacherMaster.update({
            data: {
                status: status
            },
            where: {
                id: id
            }
        })
        return { code: 200, status: "success", message: `${user.message?.firstName} ${user.message?.lastName}   teacher status  updated` }
    } catch (prismaError: any) {
        return { code: 500, status: "error", message: prismaError.message }
    }
}

export const teacherDelete = async (id: string) => {
    try {
        let user: any = await getTeacher(id);
        if (!user) {
            return { status: "error", message: `teacher not found` }
        }
        await prisma.teacherMaster.delete({
            where: {
                id: id
            }
        })
        return { code: 200, status: "success", message: `${user.message.firstName} ${user.message.lastName}   teacher delete   ` }
    } catch (prismaError: any) {
        return { code: 500, status: "error", message: prismaError.message }
    }
}


export const getInstituteTeacher = async (page: number, insID: string) => {
    try {
        const skip = (page - 1) * 10;
        let totalPage = await prisma.teacherMaster.count({
            where: {
                fk_institute_id: insID
            }
        });
        let totalRow = totalPage;
        totalPage = Math.ceil(totalPage / 10);
        return {
            code: 200, status: "success", message: await prisma.teacherMaster.findMany({
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                    gender: true,
                    dob: true,
                    status: true,
                    createAt: true,
                },
                skip: skip,
                take: 10,
                where: {
                    fk_institute_id: insID
                },
                orderBy: {
                    createAt: 'desc'
                  }
            }),
            totalPage: totalPage,
            totalRow: totalRow
        }
    } catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    }


}
export const InstituteteacherSeach = async (page: number, query: string, insID: string) => {
    try {
        const skip = (page - 1) * 10;
        let totalPage = await prisma.teacherMaster.count({
            where: {
                fk_institute_id: insID,
                OR:
                    [
                        {
                            firstName: {
                                contains: query
                            }
                        },
                        {
                            lastName: {
                                contains: query
                            }
                        },
                        {
                            email: {
                                contains: query
                            }
                        },
                        {
                            phone: {
                                contains: query
                            }
                        },
                        {
                            gender: {
                                contains: query
                            }
                        }


                    ],


            }
        });
        let totalRow = totalPage;
        totalPage = Math.ceil(totalPage / 10);
        return {
            code: 200, status: "success", message: await prisma.teacherMaster.findMany({
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                    gender: true,
                    dob: true,
                    status: true,
                    createAt: true,
                    updatedAt: true
                },
                skip: skip,
                take: 10,
                where: {
                    fk_institute_id: insID,
                    OR:
                        [
                            {
                                firstName: {
                                    contains: query
                                }
                            },
                            {
                                lastName: {
                                    contains: query
                                }
                            },
                            {
                                email: {
                                    contains: query
                                }
                            },
                            {
                                phone: {
                                    contains: query
                                }
                            },
                            {
                                gender: {
                                    contains: query
                                }
                            }


                        ],


                }


            }),
            totalPage: totalPage,
            totalRow: totalRow
        }
    } catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    }
}

export const editInstituteTeache=async (userid:string,data:{
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    dob: Date,
    gender: string,
    country: string,
    state: string,
    city: string,
    address: string,
    pin: string
}) => {
        try {
             await prisma.teacherMaster.update({
                data: {
                    firstName: data.firstname,
                    lastName: data.lastname,
                    email: data.email,
                    phone: data.phone,
                    dob: new Date(data.dob),
                    gender: data.gender,
                   
                },
                where:{
                    id:userid
                }
            })
            await prisma.teacherAddress.upsert({
                where:{
                    fkTeacherId:userid
                   },
                   update:{
                    
                        fkcountryId: data.country,
                        fkstateId: data.state,
                        fkcityId: data.city,
                        Address: data.address,
                        pin: data.pin
                   },
                   create:{
                    fkcountryId: data.country,
                    fkstateId: data.state,
                    fkcityId: data.city,
                    Address: data.address,
                    pin: data.pin,
                    fkTeacherId:userid
                   }
            })
            return {code:200,status:"success",message:"teacher updated"}
        }
        catch (e: any) {
            return { code: 500, status: 'error', message: e.message }
        }

}