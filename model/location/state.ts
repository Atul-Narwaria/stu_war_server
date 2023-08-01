import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const createState = async (countryId: string, state: string) => {
    try {
        await prisma.state.create({
            data: {
                fkCountryId: countryId,
                stateName: state,
                status: true
            }
        })
        return { code: 200, status: "success", message: "state created successfully" }
    } catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    }
}

export const getStateByCountry = async (countryId: string) => {
    try {
        return {
            code: 200, status: "success",
            message: await prisma.state.findMany({
                select: {
                    id: true,
                    stateName: true,
                    status: true
                },
                orderBy: {
                    createAt: "desc"
                },
                where: {
                    fkCountryId: countryId
                }
            })
        }
    } catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    }
}
export const getActiveStateByCountry = async (countryId: string) => {
    try {
        return {
            code: 200, status: "success",
            message: await prisma.state.findMany({
                select: {
                    id: true,
                    stateName: true
                },
                orderBy: {
                    createAt: "desc"
                },
                where: {
                    status: true,
                    fkCountryId: countryId
                }
            })
        }
    } catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    }
}
export const getStateCityByCountry = async (countryId: string) => {
    try {
        return {
            code: 200, status: "success",
            message: await prisma.state.findMany({
                select: {
                    id: true,
                    stateName: true,
                    status: true,
                    city: {
                        select: {
                            id: true,
                            cityName: true
                        }
                    }
                },
                orderBy: {
                    createAt: "desc"
                },
                where: {
                    fkCountryId: countryId
                }
            })
        }
    } catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    }
}

export const getActiveStateCityByCountry = async (countryId: string) => {
    try {
        return {
            code: 200, status: "success",
            message: await prisma.state.findMany({
                select: {
                    id: true,
                    stateName: true,
                    status: true,
                    city: {
                        select: {
                            id: true,
                            cityName: true
                        }
                    }
                },
                orderBy: {
                    createAt: "desc"
                },
                where: {
                    status: true,
                    fkCountryId: countryId
                }
            })
        }
    } catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    }
}
export const getStatebyId = async (id: string) => {
    try {
        return {
            code: 200, status: "success",
            message: await prisma.state.findFirstOrThrow({
                where: {
                    id: id
                }
            })
        }
    } catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    }
}
export const updateState = async (id: string, status: boolean) => {
    try {
        const get = await getStatebyId(id);
        await prisma.state.update({
            data: {
                status: status
            },
            where: {
                id: id
            }
        })
        return {
            code: 200, status: "success",
            message: `${get.message.stateName} state status updated`
        }
    } catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    }
}
export const stateDelete = async (id: string) => {
    try {
        const get = await getStatebyId(id);
        await prisma.state.delete({
            where: {
                id: id
            }
        })
        return {
            code: 200, status: "success",
            message: `${get.message.stateName} state deleted`
        }
    } catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    }
}

export const AllState = async () => {
    try {
        return {
            code: 200, status: "success",
            message: await prisma.state.findMany({
                select: {
                    id: true,
                    stateName: true,
                    status: true,
                    country: {
                        select: {
                            id: true,
                            CounrtyName: true
                        }
                    }
                },
                orderBy: {
                    createAt: 'desc'
                }
            })
        }
    } catch (e: any) {
        return { code: 500, status: 'error', message: e.message }
    }
}