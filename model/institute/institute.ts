import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const createInstitue = async (datas: { name: string, email: string, phone: string, password: string, country: string, state: string, city: string, profileImg: string, address: string, pin: string, maintancePassword: string, code: string }) => {
    try {
        await prisma.instituteMaster.create({
            data: {
                name: datas.name,
                email: datas.email,
                phone: datas.phone,
                code: datas.code,
                status: true,
                onMaintaince: false,
                profileImg: datas.profileImg,
                instituteAddress: {
                    create: {
                        fkcountryId: datas.country,
                        fkstateId: datas.state,
                        fkcityId: datas.city,
                        Address: datas.address,
                        pin: datas.pin,
                        status: true
                    }
                },
                instituteLogin: {
                    create: {
                        password: datas.password,
                        maintaince_password: datas.maintancePassword,
                        status: true
                    }

                }
            }
        })
        return { code: 200, status: "success", message: "institute created successfully" }
    } catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    }
}

export const getAllCode = async (fy: string) => {
    try {
        return {
            code: 200, status: "success", message:
                await prisma.instituteMaster.findMany({
                    select: {
                        code: true
                    },
                    where: {
                        code: {
                            startsWith: fy
                        }
                    }
                })
        }
    } catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    }
}

export const getInstitutes = async () => {
    try {
        return {
            code: 200, status: "success", message:
                await prisma.instituteMaster.findMany({
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        code: true,
                        status: true,
                        instituteAddress: {
                            select: {
                                id: true,
                                state: {
                                    select: {
                                        stateName: true
                                    }
                                },
                                city: {
                                    select: {
                                        cityName: true
                                    }
                                }
                            }
                        },

                    },
                    orderBy: {
                        createAt: "desc"
                    }

                })
        }
    } catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    }
}

export const getInstituesById = async (id: string) => {
    try {
        return {
            code: 200, status: "success",
            message: await prisma.instituteMaster.findFirst({
                where: {
                    id: id
                }
            })
        }
    } catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    }
}

export const updateInstituteStatus = async (id: string, status: boolean) => {
    try {
        let getname = await prisma.instituteMaster.findFirst({
            select: {
                name: true
            },
            where: {
                id: id
            }
        });
        if (!getname) {
            return { code: 200, status: "error", message: "No institute found" }
        }

        await prisma.instituteMaster.update({
            data: {
                status: status
            },
            where: {
                id: id
            }
        })
        return { code: 200, status: "success", message: `${getname.name}  status updated successfully` }
    } catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    }
}

export const deleteInstitute = async (id: string) => {
    try {
        let getname = await prisma.instituteMaster.findFirst({
            select: {
                name: true
            },
            where: {
                id: id
            }
        });
        if (!getname) {
            return { code: 200, status: "error", message: "No institute found" }
        }
        await prisma.instituteLogin.deleteMany({
            where: {
                fk_institute_id: id
            }
        });
        await prisma.instituteAddress.deleteMany({
            where: {
                fk_institute_id: id
            }
        })

        await prisma.instituteMaster.delete({
            where: {
                id: id
            }

        })
        return { code: 200, status: "success", message: `${getname.name}  deleted successfully` }
    } catch (e: any) {
        return { code: 200, status: 'error', message: e.message }
    }
}

export const getInstitute = async (type: string, value: string) => {
    try {

        if (type === "id") {
            return {
                code: 200, status: "success",
                message: await prisma.instituteMaster.findFirst({

                    where: {
                        id: value
                    }
                })
            }
        }
        if (type === "email") {
            return {
                code: 200, status: "success",
                message: await prisma.instituteMaster.findFirst({
                    where: {
                        email: value
                    }
                })
            }
        }
        if (type === "code") {
            return {
                code: 200, status: "success",
                message: await prisma.instituteMaster.findFirst({
                    where: {
                        code: value
                    }
                })
            }
        }

        return {
            code: 500, status: "error",
            message: "Server error"
        }

    } catch (e: any) {
        return { code: 200, status: 'error', message: e.message }
    }
}

export const getInstitutePassword = async (id: string) => {
    try {
        return {
            code: 200, status: "success",
            message: await prisma.instituteLogin.findFirst({
                select: {
                    id: true,
                    password: true
                },
                where: {
                    fk_institute_id: id
                }
            })
        }
    } catch (e: any) {
        return { code: 200, status: 'error', message: e.message }
    }
}