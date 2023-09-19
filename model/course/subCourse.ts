import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const createSubCourse =async (data:{
    name:string,
    amount:any,
    image:any,
    description:string,
    durantion:any,
},fk_institute_id:string) => {
    try{
        const check = await prisma.subCourses.count({
            where:{
                name:data.name,
            }
        })
        if(check != 0){
            return { code: 422, status: "success", message: `${data.name} is already created` }
        }
        await prisma.subCourses.create({
            data:{
                fk_institute_id:fk_institute_id,
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
export const getActiveSubCourse =async (fk_institute_id:string) => {
    try{
        return {
            code: 200, status: "success", message:
                await prisma.subCourses.findMany({
                    where: {
                        status:true,
                        fk_institute_id:fk_institute_id
                    }
                })
        }
    }catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    } 
}
export const getAllSubCourse =async (fk_institute_id:string) => {
    try{
        return {
            code: 200, status: "success", message:
                await prisma.subCourses.findMany({
                    where:{
                        fk_institute_id:fk_institute_id
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

export const InstituteSubCourseSeach = async (page: number, query: string, insID: string) => {
    try {
        const skip = (page - 1) * 10;
        let totalPage = await prisma.subCourses.count({
            where: {
                fk_institute_id:insID,
                OR:
                    [
                        {
                            name: {
                                contains: query
                            }
                        },
                    ],


            }
        });
        let totalRow = totalPage;
        totalPage = Math.ceil(totalPage / 10);
        return {
            code: 200, status: "success", message: await prisma.subCourses.findMany({
                select: {
                    id: true,
                    name: true,
                    amount: true,
                    duration: true,
                    image: true,
                    status: true,
                },
                skip: skip,
                take: 10,
                where: {
                    fk_institute_id:insID,
                    OR:
                        [
                            {
                                name: {
                                    contains: query
                                }
                            },
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