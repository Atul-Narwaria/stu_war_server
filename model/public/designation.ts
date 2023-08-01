import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const createDesignation =async (name:string) => {
    try{
       await prisma.designation.create({
        data:{
            roles:name,
            status:true
        }
       })
        return {status:"success",message:"designation "+ name +" is created successfully"}
    }catch(prismaError:any){
        return {status:"error",message:prismaError.message}
    }
}