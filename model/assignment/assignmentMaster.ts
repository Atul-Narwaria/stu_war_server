import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const createAssignmentMaster =async (data:{
    name:string, end_date:any,fk_assignment_type:string, 
},instId:string) => {
    try{

         await prisma.assignmentMaster.create({
            data:{
                name:data.name,
                fk_assignment_type:data.fk_assignment_type,
                fk_institute_id:instId,
                end_date:data.end_date,
                repeat:false,
                status:true
            }
        })
        return { code: 200, status: "success", message: `${data.name} Assignment Created successfully` }
    }catch (e: any) {
        console.log(e)
        return { code: 500, status: 'error', message: e.message }
    } 
}

export const editAssignmentMaster =async (data:{
     startDate:any, endDate:any
},id:string,) => {
    try{
        await prisma.assignmentMaster.update({
            data:{
                end_date:data.endDate,
            },
            where:{
                id:id
            }
        })
        return { code: 200, status: "success", message: `Assignment  updated successfully` }
    }catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    } 
}

export const updateStatusAssignmentMaster =async (id:string,status:boolean) => {
   try{
       await prisma.assignmentMaster.update({
           data:{
               status:status,
           },
           where:{
               id:id
           }
       })
       return { code: 200, status: "success", message: `Assignment  updated successfully` }
   }catch (e: any) {
       let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
   } 
}

export const getActiveAssignmentMaster = async (instId:string)=>{
    try{
        return {
            code: 200, status: "success", message:
                await prisma.assignmentMaster.findMany({
                    where: {
                        status:true,
                        fk_institute_id:instId
                    }
                })
        }
    }catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    } 
}
export const getAssignmentMaster = async (instId:string)=>{
    try{
        return {
            code: 200, status: "success", message:
                await prisma.assignmentMaster.findMany({
                    where: {
                        fk_institute_id:instId
                    }
                })
        }
    }catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    } 
}

export const deleteAssignmentMaster = async (id: string) => {
    try {
        await prisma.assignmentMaster.delete({
            where: {
                id: id,
            }

        })
        return { code: 200, status: "success", message: `assignment deleted successfully` }
    } catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    }
}