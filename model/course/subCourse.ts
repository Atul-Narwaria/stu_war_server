import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const createSubCourse =async (data:{
    courseId:string
    name:string,
    amount:any,
    image:any,
    description:string,
    durantion:any,
}) => {
    try{
        const check = await prisma.subCourses.count({
            where:{
                fk_course_id:data.courseId,
                name:data.name,
            }
        })
        if(check != 0){
            return { code: 422, status: "success", message: `${data.name} is already created` }
        }
        await prisma.subCourses.create({
            data:{
                fk_course_id:data.courseId,
                name:data.name,
                amount:parseInt(data.amount),
                image:data.image,
                description:data.description,
                duration:parseInt(data.durantion),
                status:true
            }
        })
        return { code: 200, status: "success", message: `${data.name}   course created successfully` }
    }  catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    } 
}
export const updateSubCourseStatus = async (courseId:string, status:boolean)=>{
    try{
        await prisma.subCourses.update({
            data:{
                status:status
            },
            where:{
                id:courseId,
            }
        })
        return { code: 200, status: "success", message: ` course updated successfully` }
    }catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    } 
} 
export const getActiveSubCourse =async (CourseId:string) => {
    try{
        return {
            code: 200, status: "success", message:
                await prisma.subCourses.findMany({
                    where: {
                        status:true,
                        fk_course_id:CourseId
                    }
                })
        }
    }catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    } 
}
export const getAllSubCourse =async (courseId:string) => {
    try{
        return {
            code: 200, status: "success", message:
                await prisma.subCourses.findMany({
                    where:{
                        fk_course_id:courseId
                    }
                })
        }
    }catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    } 
}
export const getSubCourseById =async (id:string) => {
    try{
        return {
            code: 200, status: "success", message:
                await prisma.subCourses.findMany({
                    where:{
                        id:id
                    }
                })
        }
    }catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    } 
}
export const editSubCourse =async (data:{
    courseId:string,
    name:string,
    amount:number,
    image:any,
    description:string,
    durantion:number,
    status:boolean,
},subCourseId:string) => {
    try{
        await prisma.subCourses.update({
            data:{
                fk_course_id:data.courseId,
                name:data.name,
                amount:data.amount,
                image:data.image,
                description:data.description,
                duration:data.durantion,
                status:data.status,   
            },
            where:{
                id:subCourseId
            }
        })
        return { code: 200, status: "success", message: ` course updated successfully` }
    }catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    } 
}

export const deleteSubCourse = async (id: string) => {
    try {
        await prisma.subCourses.delete({
            where: {
                id: id,
            }

        })
        return { code: 200, status: "success", message: `Course deleted successfully` }
    } catch (e: any) {
        return { code: 200, status: 'error', message: e.message }
    }
}