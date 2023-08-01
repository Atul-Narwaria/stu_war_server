import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
export const create =async (firstName:string,lastName:string,email:string,phone:string,password:string,gender:string,dob:string,department:string,joiningData:string,designation:string) => {
    try{
        // var createTeacher:Prisma.TeacherMasterCreateInput;
        // createTeacher = {
        //     firstName:firstName,
        //     lastName:lastName,
        //     email:email,
        //     phone:phone,
        //     password:password,
        //     gender:gender,
        //     dob:dob,
        //     teacherId:teacherId,
        //     profileImg:profileImg,
        //     joiningDate:joiningDate,
        //     status:true,
        //     Teacherdepartment:{
        //         connect:{
                    
        //         }
        //     }

            

        // }

    }catch(e:any){
        return {status:false,message:e.meta}
    }
}