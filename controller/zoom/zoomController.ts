const moment = require("moment-timezone");
import { generateRandomString } from "../../helper/randomChar";
import {
  getAllBatchWithliveClass,
  getBatchById,
} from "../../model/batch/batch";
import _ from "lodash";
import {
  createLiveClass,
  getCheckMeeting,
} from "../../model/batch/batchLiveClass";
import { prisma } from "@prisma/client";
const axios = require("axios");

const config = {
  method: "post",
  maxBodyLength: Infinity,
  url:
    "https://zoom.us/oauth/token?grant_type=account_credentials&account_id=" +
    process.env.ZOOM_ACCOUNT,
  headers: {
    Authorization: `Basic ${Buffer.from(
      `${process.env.ZOOM_CLIENT}:${process.env.ZOOM_SECRET}`
    ).toString("base64")}`,
  },
};

export const createZoomMeetingSchedule = async (
  topic: string,
  start_time: string,
  duration: number,
  password?: any
) => {
  let authResponse: any = null;
  await axios
    .request(config)
    .then((response: any) => {
      authResponse = response.data;
    })
    .catch((error: any) => {
      return { code: 500, status: "error", message: error.message };
    });

  const access_token: string = authResponse.access_token;
  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };
  const scheduleTime = new Date(start_time);
  console.log(scheduleTime);
  let data: any = JSON.stringify({
    topic: topic,
    type: 2,
    start_time: scheduleTime.toISOString(),
    duration: duration,
    password: password ? password : "Atul@1234",
    settings: {
      join_before_host: true,
      waiting_room: true,
    },
  });
  const meetingResponse: any = await axios.post(
    `${process.env.Zoom_BASE_URL}/users/me/meetings`,
    data,
    { headers }
  );
  if (meetingResponse.status !== 201) {
    return {
      code: 500,
      status: "error",
      message: "Unable to generate meeting link",
    };
  }

  const response_data = meetingResponse.data;

  const content = {
    meeting_url: response_data.join_url,
    meeting_number: response_data.id,
    meetingTime: response_data.start_time,
    purpose: response_data.topic,
    duration: response_data.duration,
    password: response_data.password,
    status: 1,
  };

  return {
    code: 200,
    status: "success",
    message: content,
  };
};
export const createZoomMeeting = async (
  topic: string,
  start_time: string,
  duration: number,
  password?: any
) => {
  let authResponse: any = null;
  await axios
    .request(config)
    .then((response: any) => {
      authResponse = response.data;
    })
    .catch((error: any) => {
      return { code: 500, status: "error", message: error.message };
    });

  const access_token: string = authResponse.access_token;
  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };
  const scheduleTime = new Date(start_time);
  console.log(scheduleTime);
  let data: any = JSON.stringify({
    topic: topic,
    type: 1,
    start_time: scheduleTime.toISOString(),
    duration: duration,
    password: password ? password : "Atul@1234",
    settings: {
      join_before_host: true,
      waiting_room: true,
    },
  });
  const meetingResponse: any = await axios.post(
    `${process.env.Zoom_BASE_URL}/users/me/meetings`,
    data,
    { headers }
  );
  if (meetingResponse.status !== 201) {
    return {
      code: 500,
      status: "error",
      message: "Unable to generate meeting link",
    };
  }

  const response_data = meetingResponse.data;

  const content = {
    meeting_url: response_data.join_url,
    meeting_number: response_data.id,
    meetingTime: response_data.start_time,
    purpose: response_data.topic,
    duration: response_data.duration,
    password: response_data.password,
    status: 1,
  };

  return {
    code: 200,
    status: "success",
    message: content,
  };
};

export const getMeetingList = async () => {
  let authResponse: any = null;
  await axios
    .request(config)
    .then((response: any) => {
      authResponse = response.data;
    })
    .catch((error: any) => {
      return { code: 500, status: "error", message: error.message };
    });

  const access_token: string = authResponse.access_token;
  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };
  const url = `${process.env.Zoom_BASE_URL}/users/me/meetings`;
  const options: any = {
    method: "get",
    url,
    headers,
  };
  let meetingInfo = axios(options)
    .then((response: any) => {
      return {
        code: 200,
        status: "success",
        message: response.data,
      };
    })
    .catch((error: any) => {
      return {
        code: 500,
        status: "error",
        message: error.message,
      };
    });
  return await meetingInfo;
};

export const createbatchLiveClass = async () => {
  var batches = await getAllBatchWithliveClass();
  if (batches.code === 200 && batches.status === "success") {
    if (batches.message.length > 0) {
      batches.message.map(async (item: any) => {
        var startMoment = moment(item.start_time, "HH:mm:ss");
        var endMoment = moment(item.end_time, "HH:mm:ss");
        var duration = endMoment.diff(startMoment, "minutes");
        var minutes = duration;
        if (minutes > 30) {
          minutes = 30;
        }
        const todayIST = moment.tz("Asia/Kolkata");
        const today = todayIST.format("yyyy-MM-DD");
        const dayNameIST = todayIST.format("dddd").toUpperCase();
        let startTime = today + "T" + item.start_time + ":00";
        const istTime = moment.tz(startTime, "Asia/Kolkata");
        // const utcTime = istTime.utc();
        let weeks = item.weekdays.split(",");
        let password = await generateRandomString(8);
        if (_.includes(weeks, dayNameIST)) {
          let data = [item.name, startTime, minutes, password];
          let checkMeeting: any = await getCheckMeeting(item.id);
          if (checkMeeting.message === 0) {
            const createMeeting: any = await createZoomMeeting(
              item.name,
              startTime,
              minutes,
              password
            );
            console.log(createMeeting);
            if (createMeeting.status === "success") {
              try {
                let id = await createLiveClass(
                  createMeeting.message.purpose,
                  createMeeting.message.meetingTime,
                  createMeeting.message.duration,
                  createMeeting.message.password,
                  createMeeting.message.meeting_url,
                  item.id,
                  createMeeting.message.meeting_number.toString()
                );
              } catch (e: any) {
                console.log(e.message);
              }
            }
          }
        }
      });
    }
  }
};

export const signature = async (meetingNumber: any, role: any) => {
  const iat = Math.round(new Date().getTime() / 1000) - 30;
  const exp = iat + 60 * 60 * 2;
  const oHeader = { alg: "HS256", typ: "JWT" };
  const oPayload = {
    sdkKey: process.env.ZOOM_MEETING_SDK_KEY,
    mn: meetingNumber,
    role: role,
    iat: iat,
    exp: exp,
    appKey: process.env.ZOOM_MEETING_SDK_KEY,
    tokenExp: iat + 60 * 60 * 2,
  };
};

export const createBatchZoomClass = async (batchId: string) => {
  try {
    const get: any = await getBatchById(batchId);

    if (get.status !== "success") {
      return { code: get.code, status: get.status, message: get.message };
    }
    console.log(get.message.status);
    if (get.message.haveLiveClass === false) {
      return {
        code: 422,
        status: "error",
        message: "live class is disabled on this batch",
      };
    }
    var startMoment = moment(get.start_time, "HH:mm:ss");
    var endMoment = moment(get.end_time, "HH:mm:ss");
    var duration = endMoment.diff(startMoment, "minutes");
    var minutes = duration;
    if (minutes > 30) {
      minutes = 30;
    }
    const todayIST = moment.tz("Asia/Kolkata");
    const today = todayIST.format("yyyy-MM-DD");
    const dayNameIST = todayIST.format("dddd").toUpperCase();
    let startTime = today + "T" + get.message.start_time + ":00Z";
    console.log(startTime);
    let weeks = get.message.weekdays.split(",");
    let password = await generateRandomString(8);
    if (_.includes(weeks, dayNameIST)) {
      let checkMeeting: any = await getCheckMeeting(get.message.id);
      if (checkMeeting.message === 0) {
        const createMeeting: any = await createZoomMeetingSchedule(
          get.message.name,
          startTime,
          minutes,
          password
        );
        if (createMeeting.status === "success") {
          try {
            await createLiveClass(
              createMeeting.message.purpose,
              createMeeting.message.meetingTime,
              createMeeting.message.duration,
              createMeeting.message.password,
              createMeeting.message.meeting_url,
              get.message.id,
              createMeeting.message.meeting_number.toString()
            );
            return {
              code: 200,
              status: "success",
              message: "live class created successfully",
            };
          } catch (e: any) {
            console.log(e.message);
          }
        }
      }
    }
    return {
      code: 500,
      status: "error",
      message: "server error",
    };
  } catch (e: any) {
    return { code: 500, status: "error", message: e.message };
  }
};
