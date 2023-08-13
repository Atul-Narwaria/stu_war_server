import bcrypt from "bcrypt";
import { createInstitue } from "../../model/institute/institute";
import { instituteCode } from "../../helpers/Code.helper";

export const createInstitute = async (data: { name: string, email: string, phone: string, password: string, country: string, state: string, city: string, profileImg: string, address: string, pin: string, maintancePassword: string, code: string }) => {
    try {
        let maintancepassword: string = process?.env?.MAINTANCE_PASSWORD ? process?.env?.MAINTANCE_PASSWORD : "Atul@1234";
        let hashpassword = bcrypt.hashSync(data.password, 10);
        let datas = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: hashpassword,
            country: data.country,
            state: data.state,
            city: data.city,
            profileImg: data.city,
            address: data.address,
            pin: data.pin,
            maintancePassword: bcrypt.hashSync(maintancepassword, 10),
            code: await instituteCode()
        }
        const { code, status, message } = await createInstitue(datas);
        return { code, status, message }
    } catch (e: any) {
        return { code: 500, status: "error", message: e.message }
    }
}

export const test = async () => {
    return await instituteCode();
}