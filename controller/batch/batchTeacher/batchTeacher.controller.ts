// import moment from "moment";
import { checkTodayRemainingBatch } from "../../../model/batch/batchTeacherLink";
import _ from "lodash";
import moment from "moment-timezone";
const desiredTimezone = "Asia/Kolkata";
export const TodayRemainingBatch = async (id: string) => {
  try {
    let getBatch: any = await checkTodayRemainingBatch(id);
    if (getBatch.message.length < 0) {
      return { code: 200, status: "success", message: [] };
    }
    const today = moment();
    console.log(today);
    const todayWeekDay = today.format("dddd").toUpperCase();
    var remaining = 0;
    var total = 0;
    getBatch.message.map((e: any) => {
      let getbatchweeksdays = e.batchId.weekdays;

      let startTime = moment.tz(e.batchId.start_time, "HH:mm", desiredTimezone);
      getbatchweeksdays = getbatchweeksdays.split(",");
      if (_.includes(getbatchweeksdays, todayWeekDay)) {
        total = total + 1;
        if (today.isBefore(startTime)) {
          remaining = 1 + remaining;
        }
      }
    });
    return { code: 200, status: "success", message: { remaining, total } };
  } catch (e: any) {
    return { code: 500, status: "error", message: e.message };
  }
};

export const BatchListDashboard = async (id: string) => {
  try {
    let getBatch: any = await checkTodayRemainingBatch(id);
    if (getBatch.message.length < 0) {
      return { code: 200, status: "success", message: [] };
    }
    var batchlist: any = [];

    const today = moment();

    const todayWeekDay = today.format("dddd").toUpperCase();
    getBatch.message.map((e: any) => {
      let getbatchweeksdays = e.batchId.weekdays;
      let startTime = moment.tz(e.batchId.start_time, "HH:mm", desiredTimezone);
      let endTime = moment.tz(e.batchId.end_time, "HH:mm", desiredTimezone);
      getbatchweeksdays = getbatchweeksdays.split(",");
      let timstatus = false;
      if (today.isBefore(startTime)) {
        timstatus = false;
      } else if (today.isAfter(endTime)) {
        timstatus = false;
      } else {
        timstatus = true;
      }
      if (_.includes(getbatchweeksdays, todayWeekDay)) {
        //

        batchlist.push({
          id: e.batchId.id,
          name: e.batchId.name,
          start_time: e.batchId.start_time,
          end_time: e.batchId.end_time,
          course: e.batchId?.subCourses?.name,
          timeStatus: timstatus,
          liveClass: e.batchId.haveLiveClass,
          liveClassData: e.batchId.batchLiveClass,
        });
      }
    });
    return { code: 200, status: "success", message: batchlist };
  } catch (e: any) {
    return { code: 500, status: "error", message: e.message };
  }
};
