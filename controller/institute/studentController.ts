import bcrypt from "bcrypt";
import { getInstituesById } from "../../model/institute/institute";
import { studentAddmissionId } from "../../helper/uniqueId.helper";
import { createStudentWithAddress } from "../../model/student/student";

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
    console.log(getAddmissionid.status);
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