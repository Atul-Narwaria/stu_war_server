import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const createCity = async (countryId: string, stateId: string, city: string) => {
    try {
        await prisma.city.create({
            data: {
                fkCountryId: countryId,
                fkstateId: stateId,
                cityName: city,
                status: true
            }
        })
        return { code: 200, status: "success", message: "city created successfully" }
    } catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    }
}

export const getCity = async (countryId: string, stateId: string) => {
    try {
        return {
            code: 200, status: "success",
            message: await prisma.city.findMany({
                orderBy: {
                    createAt: "desc"
                },
                where: {
                    fkCountryId: countryId,
                    fkstateId: stateId
                }
            })
        }
    } catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    }
}
export const getActiveCity = async (countryId: string, stateId: string) => {
    try {
        return {
            code: 200, status: "success",
            message: await prisma.city.findMany({
                orderBy: {
                    createAt: "desc"
                },
                where: {
                    fkCountryId: countryId,
                    fkstateId: stateId,
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
export const getCitybyId = async (id: string) => {
    try {
        return {
            code: 200, status: "success",
            message: await prisma.city.findFirstOrThrow({
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
export const updatecity = async (id: string, status: boolean) => {
    try {
        const get = await getCitybyId(id);
        await prisma.city.update({
            data: {
                status: status
            },
            where: {
                id: id
            }
        })
        return {
            code: 200, status: "success",
            message: `${get.message.cityName} city status updated`
        }
    } catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    }
}
export const cityDelete = async (id: string) => {
    try {
        const get = await getCitybyId(id);
        await prisma.city.delete({
            where: {
                id: id
            }
        })
        return {
            code: 200, status: "success",
            message: `${get.message.cityName} city deleted`
        }
    } catch (e: any) {
        let split = e.message.split(".")
            split = split.slice(-2)
        return { code:500,status: "error", message: split[0] };
    }
}

export const getCityWithStateCountry = async () => {
    try {

        return {
            code: 200, status: "success",
            message: await prisma.city.findMany({
                select: {
                    id: true,
                    cityName: true,
                    status: true,
                    state: {
                        select: {
                            stateName: true,
                            country: {
                                select: {
                                    CounrtyName: true
                                }
                            }
                        },

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