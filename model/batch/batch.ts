import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const createBatch = async (data:{
    
    fk_course_id:string,
    name:string,
    end_time:string,
    weekdays:string,
    start_time:string,

},fk_institute_id:string)=>{
    try{
        
        await prisma.batchMaster.create({
            data:{
                fk_sub_course_id:data.fk_course_id,
                fk_institute_id:fk_institute_id,
                name:data.name,
                start_time:data.start_time,
                end_time:data.end_time,
                weekdays:data.weekdays,
                status:true
            }
        });
        return { code: 200, status: "success", message: `${data.name} course created successfully` }

    } catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    } 
}
export const updateBatchStatus = async (id:string, status:boolean)=>{
    try{
        await prisma.batchMaster.update({
            data:{
                status:status
            },
            where:{
                id:id,
            }
        })
        return { code: 200, status: "success", message: ` batch updated successfully` }
    }catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    } 
} 
export const getActiveBatch =async (instituteId:string) => {
    try{
        return {
            code: 200, status: "success", message:
                await prisma.batchMaster.findMany({
                    where: {
                        status:true,
                        fk_institute_id:instituteId
                    }
                })
        }
    }catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    } 
}
export const getAllbatch =async (instituteId:string) => {
    try{
        return {
            code: 200, status: "success", message:
                await prisma.batchMaster.findMany({
                    where: {
                        fk_institute_id:instituteId
                    }
                })
        }
    }catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    } 
}
export const deleteBatch = async (id: string) => {
    try {
        await prisma.batchMaster.delete({
            where: {
                id: id,
                
            }

        })
        return { code: 200, status: "success", message: `batch deleted successfully` }
    } catch (e: any) {
        return { code: 200, status: 'error', message: e.message }
    }
}