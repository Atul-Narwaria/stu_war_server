import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const createCourse =async (data:{
    
    name:string,
    amount:any,
    image:any,
    description:string,
    durantion:any,
},instituteId:string) => {
    try{
        const check = await prisma.courses.count({
            where:{
                name:data.name,
            }
        })
        if(check != 0){
            return { code: 422, status: "error", message: `${data.name} is already created` }
        }
        await prisma.courses.create({
            data:{
                fk_institute_id:instituteId,
                name:data.name,
                amount:parseInt(data.amount),
                image:data.image,
                description:data.description,
                durantion:parseInt(data.durantion),
                status:true
            }
        })
        return { code: 200, status: "success", message: `${data.name} course created successfully` }
    }  catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    } 
}
export const updateCourseStatus = async (courseId:string, status:boolean)=>{
    try{
        await prisma.courses.update({
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
export const getActiveCourse =async (InstituteId:string) => {
    try{
        return {
            code: 200, status: "success", message:
                await prisma.courses.findMany({
                    where: {
                        status:true,
                        fk_institute_id:InstituteId
                    }
                })
        }
    }catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    } 
}
export const getAllCourse =async (page: number,insID:string) => {
    try{
        const skip = (page - 1) * 10;
        let totalPage = await prisma.courses.count({
            where: {
                fk_institute_id: insID
            }
        });
        let totalRow = totalPage;
        totalPage = Math.ceil(totalPage / 10);
        return {
            code: 200, status: "success", message:
                await prisma.courses.findMany({
                    where:{
                        fk_institute_id:insID
                    },
                    orderBy:{
                        updatedAt:"desc"
                    }
                }),
                totalPage: totalPage,
                totalRow: totalRow
        }
    }catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    } 
}
export const getCourseById =async (courseId:string) => {
    try{
        return {
            code: 200, status: "success", message:
                await prisma.courses.findFirst({
                    where:{
                        id:courseId,
                    }
                })
        }
    }catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    } 
}
export const editCourse =async (data:{
    name:string,
    amount:number,
    image:any,
    description:string,
    durantion:number,
    status:boolean,
},courseId:string) => {
    try{
        await prisma.courses.update({
            data:{
                name:data.name,
                amount:data.amount,
                image:data.image,
                description:data.description,
                durantion:data.durantion,
                status:data.status,   
            },
            where:{
                id:courseId
            }
        })
        return { code: 200, status: "success", message: ` course updated successfully` }
    }catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    } 
}

export const deleteCourse = async (id: string) => {
    try {
        await prisma.courses.delete({
            where: {
                id: id,
                
            }

        })
        return { code: 200, status: "success", message: `Course deleted successfully` }
    } catch (e: any) {
        return { code: 200, status: 'error', message: e.message }
    }
}

export const InstituteCourseSeach = async (page: number, query: string, insID: string) => {
    try {
        const skip = (page - 1) * 10;
        let totalPage = await prisma.courses.count({
            where: {
                fk_institute_id: insID,
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
            code: 200, status: "success", message: await prisma.courses.findMany({
                select: {
                    id: true,
                    name: true,
                    amount: true,
                    durantion: true,
                    image: true,
                    status: true,
                },
                skip: skip,
                take: 10,
                where: {
                    fk_institute_id: insID,
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