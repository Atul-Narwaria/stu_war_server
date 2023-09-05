import moment from "moment";
import { getstudentAddmissionIds } from "../model/student/student";
const _ = require('lodash');

export const studentAddmissionId = async (code: string) => {
    try {
        let prefix: string = `${code}FY${moment().format('YY')}-${moment().add(1, 'year').format('YY')}`
        const getIds = await getstudentAddmissionIds(prefix);
        let maxnum: number = 0;
        if (getIds) {
            if (getIds?.message?.length != 0) {
                let allids: any = [];
                getIds?.message?.map((e: any) => {

                    allids.push(parseInt(removePrefix(e.admissionId, prefix)));

                })
                maxnum = parseInt(_.max(allids)) + 1;
            }
        } else {
            maxnum = 0;
        }

        return { status: "success", message: `${prefix}${maxnum}` };
    }
    catch (e: any) {
        return { status: "error", message: e.message }
    }
}

function removePrefix(inputString: any, prefix: any) {
    if (inputString.startsWith(prefix)) {
        return inputString.slice(prefix.length);
    }
    return inputString;
}