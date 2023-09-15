import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const createLink =async (data:{
    fk_institute_id:string,
    fk_student_id:string
}) => {
    try{
        await prisma.batchLink.create({
            data:{
                fk_institute_id:data.fk_institute_id,
                fk_student_id:data.fk_student_id,
                status:true
            }
    })
        return { code: 200, status: "success", message: ` student linked successfully` }

    }catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    } 
}

export const createBulkLink = async (data:any) => {
    try{
        await prisma.batchLink.createMany({
            data: data,
            skipDuplicates: true,
        })
        return { code: 200, status: "success", message: ` students linked successfully` }
    }catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    } 
}

export const deleteBatchLink = async (id:string) => {
    try{
        await prisma.batchLink.delete({
            where: {
                id: id,
            }

        })
        return { code: 200, status: "success", message: `students linked deleted successfully` }
    }catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    } 
}
export const deleteManyBatchLink = async (data:any) => {
    try{
        await prisma.batchLink.deleteMany({
            where: {
                id: data,
            }
        })
        return { code: 200, status: "success", message: `students linked deleted successfully` }
    }catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    } 
}