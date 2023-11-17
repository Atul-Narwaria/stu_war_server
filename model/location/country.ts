import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();


export const checkCountryName = async (name: string) => {
    try {
        const get = await prisma.country.findFirst({
            where: {
                CounrtyName: name
            }
        })
        if (!get) {
            return { code: 200, status: 'error', message: "No Country Name found" }
        }
        return { code: 200, status: 'success', message: get }
    } catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    }
}

export const getCountry = async () => {
    try {

        return {
            code: 200, status: "success",
            message: await prisma.country.findMany({
                orderBy: {
                    createAt: "desc"
                }
            })
        }
    } catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    }
}
export const getActiveCountry = async () => {
    try {
        return {
            code: 200, status: "success",
            message: await prisma.country.findMany({
                orderBy: {
                    createAt: "desc"
                },
                where: {
                    status: true
                }
            })
        }
    } catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    }
}
export const createCountry = async (name: string) => {
    try {
        let { status } = await checkCountryName(name);
        if (status == "success") {
            return { code: 200, status: "error", message: "country name existed" }
        }
        await prisma.country.create({
            data: {
                CounrtyName: name,
                status: true
            }
        })
        return { code: 200, status: "success", message: "country created successfully" }
    } catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    }
}
export const getCountryStateCityAll = async () => {
    try {
        return {
            code: 200, status: "success",
            message: await prisma.country.findMany({
                select: {
                    id: true,
                    CounrtyName: true,
                    state: {
                        select: {
                            id: true,
                            stateName: true,
                        }
                    },
                    city: {
                        select: {
                            id: true,
                            cityName: true,
                        }
                    }
                },
                orderBy: {
                    createAt: "desc"
                },
            })
        }
    } catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    }
}
export const getCountrybyId = async (id: string) => {
    try {
        return {
            code: 200, status: "success",
            message: await prisma.country.findFirstOrThrow({
                where: {
                    id: id
                }
            })
        }
    } catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    }
}
export const updateCountry = async (id: string, status: boolean) => {
    try {
        const get = await getCountrybyId(id);
        await prisma.country.update({
            data: {
                status: status
            },
            where: {
                id: id
            }
        })
        return {
            code: 200, status: "success",
            message: `${get.message.CounrtyName} country status updated`
        }
    } catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    }
}
export const countryDelete = async (id: string) => {
    try {
        const get = await getCountrybyId(id);
        await prisma.country.delete({
            where: {
                id: id
            }
        })
        return {
            code: 200, status: "success",
            message: `${get.message.CounrtyName} country deleted`
        }
    } catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    }
}