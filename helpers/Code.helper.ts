import moment from "moment"
import { getAllCode } from "../model/institute/institute";




export const instituteCode = async () => {
    let year = moment().format("YY");
    let nextyear = moment().add(1, "y").format("YY")
    let fy = `FY${year}${nextyear}`;
    let getAllCodes: any = await getAllCode(fy);
    if (getAllCodes?.message.length === 0) {
        return `${fy}001`
    }
    let allcode = getAllCodes.message;
    let codeNumber: any = [];
    allcode.map((e: any) => {
        codeNumber.push(
            parseInt(e.code.slice(6))
        )
    })
    let highestNum: any = Math.max(...codeNumber) + 1;
    highestNum = highestNum.toString();
    if (highestNum.length === 1) {
        return `${fy}00${highestNum}`
    }
    else if (highestNum.length === 2) {
        return `${fy}0${highestNum}`
    } else {
        return `${fy}${highestNum}`
    }
}