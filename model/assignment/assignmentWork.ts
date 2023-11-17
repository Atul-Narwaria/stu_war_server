import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();


export const createAssignmentWork =async (data:{
    fk_assignmentmaster_id:string,
    fk_sub_course_id:string,
    fk_stundet_id:string,
    remarks?:string,
    submissionDate:any,
    work:string
}) => {
    try{
        await prisma.assignmentWork.create({
            data:{
                fk_assignmentmaster_id:data.fk_assignmentmaster_id,
                fk_sub_course_id:data.fk_sub_course_id,
                fk_stundet_id:data.fk_stundet_id,
                remarks:data.remarks,
                submissionDate:data.submissionDate,
                work:data.work
            }
        })
        return { code: 200, status: "success", message: `work uploaded successfully` }
    }catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    } 
}

export const getAllAssignmentWork = async(assignmentMaster:string,page: number)=>{
    try{
        const skip = (page - 1) * 10;
        let totalPage = await prisma.assignmentWork.count({
            where: {
                fk_assignmentmaster_id: assignmentMaster,
            }
        });
        let totalRow = totalPage;
        totalPage = Math.ceil(totalPage / 10);
        return {
            code: 200, status: "success", message:
                await prisma.assignmentWork.findMany({
                    select:{
                        id:true,
                        remarks:true,
                        work:true,
                        submissionDate:true,
                        assignmentMaster:{
                            select:{
                                name:true,
                                id:true
                            }
                        },
                        subCourses:{
                            select:{
                                name:true,
                                id:true
                            }
                        },
                        stundetmaster:{
                            select:{
                                id:true,
                                firstName:true,
                                lastName:true,
                            }
                        }
                    },
                    where:{
                        fk_assignmentmaster_id: assignmentMaster,
                    },
                    skip: skip,
                    take: 10,
                    orderBy:{
                        updatedAt:"desc"
                    }
                }),
                totalPage: totalPage,
                totalRow: totalRow
        }
    }catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    } 
}
export const getAllAssignmentWorkSearch = async(assignmentMaster:string,query:any,page: number)=>{
    try{
        const skip = (page - 1) * 10;
        let totalPage = await prisma.assignmentWork.count({
            where: {
                fk_assignmentmaster_id: assignmentMaster,
                OR:[
                   {
                    submissionDate: query,
                   },
                   {
                    subCourses:{
                        OR:[
                            {
                                name:{
                                    contains:query
                                }
                            }
                        ]
                    },
                    stundetmaster:{
                        OR:[
                            {
                                firstName: {
                                    contains: query
                                },
                                lastName:{
                                    contains:query
                                },
                                email:{
                                    contains:query
                                },
                                phone:{
                                    contains:query
                                }
                            }
                        ]
                    }
                   }
                ]
            }
        });
        let totalRow = totalPage;
        totalPage = Math.ceil(totalPage / 10);
        return {
            code: 200, status: "success", message:
                await prisma.assignmentWork.findMany({
                    select:{
                        id:true,
                        remarks:true,
                        work:true,
                        submissionDate:true,
                        assignmentMaster:{
                            select:{
                                name:true,
                                id:true
                            }
                        },
                        subCourses:{
                            select:{
                                name:true,
                                id:true
                            }
                        },
                        stundetmaster:{
                            select:{
                                id:true,
                                firstName:true,
                                lastName:true,
                            }
                        }
                    },
                    where: {
                        fk_assignmentmaster_id: assignmentMaster,
                        OR:[
                           {
                            submissionDate: query,
                           },
                           {
                            subCourses:{
                                OR:[
                                    {
                                        name:{
                                            contains:query
                                        }
                                    }
                                ]
                            },
                            stundetmaster:{
                                OR:[
                                    {
                                        firstName: {
                                            contains: query
                                        },
                                        lastName:{
                                            contains:query
                                        },
                                        email:{
                                            contains:query
                                        },
                                        phone:{
                                            contains:query
                                        }
                                    }
                                ]
                            }
                           }
                        ]
                    },
                    skip: skip,
                    take: 10,
                    orderBy:{
                        updatedAt:"desc"
                    }
                }),
                totalPage: totalPage,
                totalRow: totalRow
        }
    }catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    } 
}
export const deleteAssignmentWork = async (id:string) => {
    try{
        await prisma.assignmentWork.delete({
            where: {
                id: id,
            }

        })
        return { code: 200, status: "success", message: `assignment deleted successfully` }
    }catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    } 
}