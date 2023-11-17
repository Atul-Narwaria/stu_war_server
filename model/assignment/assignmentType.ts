import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();



export const createAssignmentType =async (name:string,status:boolean) => {
    try{
        await prisma.assignmentType.create({
            data:{
                name:name,
                status:status
            }
        })
        return { code: 200, status: "success", message: `assignment type created successfully` }
    }catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    } 
}


export const AssignmentTypeStatusUpdate =async (id:string,status:boolean) => {
    try{
        await prisma.assignmentType.update({
            data:{
                status:status,
            },
            where:{
                id:id
            }
        })
        return { code: 200, status: "success", message: `Assignment type  updated successfully` }
    }catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    } 
 }

 export const getActiveAssignmentType = async ()=>{
    try{
        return {
            code: 200, status: "success", message:
                await prisma.assignmentType.findMany({
                   where:{
                    status:true
                   }
                })
        }
    }catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    } 
}
export const getAssignmentType = async ()=>{
    try{
        return {
            code: 200, status: "success", message:
                await prisma.assignmentType.findMany()
        }
    }catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    } 
}

 export const deleteAssignmentType = async (id: string) => {
    try {
        await prisma.assignmentType.delete({
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