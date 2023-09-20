import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const createCourseLink = async (fk_course_id:string,fk_sub_course_id:string) => {
    try{
            await prisma.courselinks.create({
                data:{
                    fk_course_id: fk_course_id,
                    fk_sub_course_id:fk_sub_course_id
                }
            })
            return { code: 200, status: "success", message: `course linked successfully` }
    } catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    } 
}

export const deleteCourseLink = async(id:string) => {
    try{
        await prisma.courselinks.delete({
            where:{
                id: id,
            }
        });
        return { code: 200, status: "success", message: `link deleted successfully` }
    }catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    } 
}