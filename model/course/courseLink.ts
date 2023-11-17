import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const createCourseLink = async (data:any) => {
    try{
            await prisma.courselinks.createMany({
                data:data,
                skipDuplicates:true
            })
            return { code: 200, status: "success", message: `course linked successfully` }
    } catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
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
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    } 
}
export const createStudentCourse = async(data:any)=>{
    try{    
         await prisma.studentCourse.createMany({
            data:data,
        })
        return { code: 200, status: "success", message: "students courses created successfully" }
    }catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    }
}
 
export const getStudentCourses = async(id:string)=>{
    try{
        const get =  await prisma.studentCourse.findMany({
            select:{
                id:true,
                courses:{
                    select:{
                        id:true,
                        name:true,
                        amount:true,
                        durantion:true,
                        image:true
                    }
                },
                subCourses:{
                    select:{
                        id:true,
                        name:true,
                        amount:true,
                        duration:true,
                        image:true
                    }
                }
            },
            where:{
                fk_stundet_id:id,
            }
        })
   }catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    }
}