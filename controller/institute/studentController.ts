import bcrypt from "bcrypt";
import { getInstituesById } from "../../model/institute/institute";
import { studentAddmissionId } from "../../helper/uniqueId.helper";
import { createBulkStudent, createStudentWithAddress } from "../../model/student/student";
import moment from "moment";
export const institutecreateStudent = async (data: {
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    dob: Date,
    admissionId: string,
    gender: string,
    profileImg: string,
    country: string,
    state: string,
    city: string,
    address: string,
    pin: string

}, insId: string) => {
    let inscode = await getInstituesById(insId);

    if (!inscode) {
        return {
            code: 403,
            status: "error",
            message: "Invalid Institute Id"
        }
    }
    let getAddmissionid: any = await studentAddmissionId(inscode.message.code);
    if (getAddmissionid.status != "success") {
        return {
            code: 400,
            status: "error",
            message: "internal error"
        }
    }
    let maintancepassword: string = process?.env?.MAINTANCE_PASSWORD ? process?.env?.MAINTANCE_PASSWORD : "12345678";
    let datas: any = {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        password: bcrypt.hashSync(maintancepassword, 10),
        dob: data.dob,
        gender: data.gender.toLowerCase(),
        admissionId: getAddmissionid.message,
        profileImg: null,
        country: data.country,
        state: data.state,
        city: data.city,
        address: data.address,
        pin: data.pin,
        instituteId: insId
    }

    const { code, status, message } = await createStudentWithAddress(datas);

    return { code, status, message }

}

export const createBulkStundentController = async (data: any, instid: string) => {
    if (!data || data.length === 0) {
        return {
            code: 422,
            status: "error",
            message: "data not define"
        }
    }
    let inscode = await getInstituesById(instid);

    if (!inscode) {
        return {
            code: 403,
            status: "error",
            message: "Invalid Institute Id"
        }
    }
    let bulkData: any = [];
    let maintancepassword: string = process?.env?.MAINTANCE_PASSWORD ? process?.env?.MAINTANCE_PASSWORD : "12345678";
    let admissionId = 0;
    let prefix: string = `${inscode.message.code}FY${moment().format('YY')}-${moment().add(1, 'year').format('YY')}`
    let getAddmissionid: any = await studentAddmissionId(inscode.message.code);
    data.map(async (e: any) => {
        let adId: any = removePrefix(getAddmissionid.message, prefix)
        if (getAddmissionid.status != "success") {
            return {
                code: 400,
                status: "error",
                message: "internal error"
            }
        }

        bulkData.push({
            firstName: e.firstName,
            lastName: e.lastName,
            email: e.email,
            phone: e.phone.toString(),
            password: bcrypt.hashSync(maintancepassword, 10),
            dob: new Date(e.dob),
            gender: e.gender,
            admissionId: `${prefix}${parseInt(adId) + admissionId}`,
            fk_institute_id: instid,
        })
        admissionId++;
    })
    const { code, status, message } = await createBulkStudent(bulkData)
    return { code, status, message }
}



function removePrefix(inputString: any, prefix: any) {
    if (inputString.startsWith(prefix)) {
        return inputString.slice(prefix.length);
    }
    return inputString;
}