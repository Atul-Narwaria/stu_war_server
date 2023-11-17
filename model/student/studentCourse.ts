import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const getCourseStudents =async (courseId:string) => {
    try{
        const get = await prisma.studentCourse.findMany({
            select:{
                id:true,
                stundetmaster:{
                    select:{
                        id:true,
                        firstName:true,
                        lastName:true,
                        email:true,
                        phone:true
                    }
                },
            },
            orderBy:{
                createAt:"desc"
            },
            where:{
                fk_course_id:courseId
            }
        })
        return { code: 200, status: "success", message: get }
    }catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    }
}

export const getSubCourseStudents =async (courseId:string) => {
    try{
        const get = await prisma.studentCourse.findMany({
            select:{
                id:true,
                stundetmaster:{
                    select:{
                        id:true,
                        firstName:true,
                        lastName:true,
                        email:true,
                        phone:true
                    }
                },
            },
            orderBy:{
                createAt:"desc"
            },
            where:{
                fk_sub_course_id:courseId
            }
        })
        return { code: 200, status: "success", message: get }
    }catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    }
}

export const deleteStudentCourse = async(id:string)=>{
    try{
         await prisma.studentCourse.delete({
            where:{
                id:id
            }
        })
        return { code: 200, status: "success", message: "sub-course  deleted successfully" }
    }catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    }
}

export const getActiveStudentWithCourse =async (page: number, insID: string) => {
    try{
        const skip = (page - 1) * 10;
        let totalPage = await prisma.studentMaster.count({
            where: {
                fk_institute_id: insID
            }
        });
        let totalRow = totalPage;
        totalPage = Math.ceil(totalPage / 10);
        const get = await prisma.studentMaster.findMany({
            select:{
                id:true,
                firstName:true,
                lastName:true,
                email:true,
                phone:true,
                StudentCourse:{
                    select:{
                        subCourses:{
                            select:{
                                id:true,
                                name:true
                            }
                        },
                        courses:{
                            select:{
                                id:true,
                                name:true
                            }
                        }
                    }
                }
            },
            orderBy:{
                createAt:"desc",
            },
            skip: skip,
                take: 10,
                where: {
                    fk_institute_id: insID,
                    status:true
                },
        })

        return { code: 200, status: "success", message: get,  totalPage: totalPage,
        totalRow: totalRow }
    }catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    }
}