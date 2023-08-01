import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const CreateAdmin =async (name:string,email:string,phone:string,password:string) => {
    try{
        let checkemail =await isAdminEmailUnique(email);
        if(checkemail == true){
           return {code:409,status:"error",message:"email already exists"}
        }
        let checkphone =await isAdminPhoneUnique(phone);
        if(checkphone == true){
           return {code:409,status:"error",message:"phone already exists"}
        }
        await prisma.admin.create({
            data:{
                name:name,
                email:email,
                phone:phone,
                password:password, 
                status:true
            }
        })
        return {code:200,status:"success",message:"admin crated successfully"}
    }catch(e:any){
        console.log(e)
        return {code:500,status:"error",message:e.message}
    }
}



export const getAdmin =async (email:string) => {
    try{
        const get:any = await prisma.admin.findFirst({
            select:{
                id:true,
                name:true,
                email:true,
                password:true,
                phone:true
            },
            where:{
                email:email
            }
        })
        if(!get){
            return {code:500,status:"error",message:"no user found"}
        }
        return {code:200,status:"success",message:get}
    }catch(e:any){
        return {code:500,status:"error",message:e.message}
    }
}

export const CheckAdminExistance =async (id:string) => {
    try{
        return await prisma.admin.count({
            where:{id:id}
        })
    }catch(e:any){
        return {code:500, status:"error",message:e.message}
    }
}
export const isAdminEmailUnique =async (email:string) => {
    try{
        
        let count =  await prisma.admin.count({
            where:{email:email}
        })
        if(count > 1){
            return false;
        }
        return true
    }catch(e:any){
        return {code:500, status:"error",message:e.message}
    }
}
export const isAdminPhoneUnique =async (phone:string) => {
    try{
        let count =  await prisma.admin.count({
            where:{phone:phone}
        })
        if(count > 1){
            return false;
        }
        return true
    }catch(e:any){
        return {code:500, status:"error",message:e.message}
    }
}