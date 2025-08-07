import { BrowserWindow } from "electron";
import fs from "fs";
import os from "os";
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

export const pollresources = async (mainWindow: BrowserWindow) => {
  // console.log(
  //   JSON.stringify(
  //     {
  //       platform: platform(),
  //       cpuCount: cpuCount(),
  //       cpuFree: freeCpu,
  //       allLoadavg: allLoadavg(),
  //       freemem: freemem(),
  //       freememPercent: 1 - freememPercentage(),
  //       totalmem: totalmem(),
  //       sysUptime: sysUptime(),
  //       processUptime: processUptime(),
  //       // harddrive: driveInfo,
  //       processes: processes,
  //     },
  //     null,
  //     2
  //   )
  // );

  setInterval(async () => {
    const [processes, freeCpu, usage] = await Promise.all([
      new Promise<string>((resolve) => getProcesses(resolve)),
      new Promise<number>((resolve) => cpuFree(resolve)),
      getCpuUsage(),
    ]);
    // const cpuUsage = await getCpuUsage();
    const netStorage = getStorageData();
    // console.log({ usage, netStorage });
    mainWindow.webContents.send("statistics", {
      cpuUsage: usage,
      netStorage,
      platform: platform(),
      cpuCount: cpuCount(),
      cpuFree: freeCpu,
      allLoadavg: allLoadavg(),
      freemem: freemem(),
      freememPercent: 1 - freememPercentage(),
      totalmem: totalmem(),
      sysUptime: sysUptime(),
      processUptime: processUptime(),
      processes: processes,
    });
  }, Polling_Interval);
};

const getCpuUsage = (): Promise<number> => {
  return new Promise((resolve) => {
    cpuUsage(resolve);
  });
};

const getStorageData = () => {
  const stats = fs.statfsSync(process.platform === "win32" ? "C://" : "/");
  const total = stats.bsize * stats.blocks;
  const free = stats.bsize * stats.bfree;

  return {
    total: Math.floor(total / 1_000_000_000),
    usage: 1 - free / total,
  };
};

export const getStaticData = () => {
  const totalStorage = getStorageData().total;
  const cpuModel = os.cpus()[0].model;
  const totalMemoryDB = Math.floor(totalmem() / 1024);

  return {
    totalStorage,
    cpuModel,
    totalMemoryDB,
  };
};
