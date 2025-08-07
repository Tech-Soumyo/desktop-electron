import osUtils from "os-utils";

const Polling_Interval = 500;

export const pollresources = () => {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage();
    console.log(cpuUsage);
  }, Polling_Interval);
};

const getCpuUsage = () => {
  return new Promise((resolve) => {
    osUtils.cpuUsage(resolve);
  });
};
