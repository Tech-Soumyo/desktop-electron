import {
  getProcesses,
  allLoadavg,
  cpuCount,
  cpuFree,
  cpuUsage,
  freemem,
  freememPercentage,
  harddrive,
  platform,
  processUptime,
  sysUptime,
  totalmem,
} from "os-utils";

const Polling_Interval = 500;

export const pollresources = async () => {
  const [freeCpu, processes] = await Promise.all([
    new Promise((resolve) => getProcesses(resolve)),
    new Promise((resolve) => cpuFree(resolve)),
    // new Promise((resolve) => harddrive(resolve)),
  ]);

  setInterval(async () => {
    const cpuUsage = await getCpuUsage();
    console.log({ cpuUsage });
    console.log(
      JSON.stringify(
        {
          platform: platform(),
          cpuCount: cpuCount(),
          cpuFree: freeCpu,
          allLoadavg: allLoadavg(),
          freemem: freemem(),
          freememPercent: 1 - freememPercentage(),
          totalmem: totalmem(),
          sysUptime: sysUptime(),
          processUptime: processUptime(),
          // harddrive: driveInfo,
          processes: processes,
        },
        null,
        2
      )
    );
  }, Polling_Interval);
};

const getCpuUsage = () => {
  return new Promise((resolve) => {
    cpuUsage(resolve);
  });
};
