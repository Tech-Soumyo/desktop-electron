/// <reference types="vite/client" />

export interface IStatistics {
  cpuUsage: number;
  netStorage: {
    total: number;
    usage: number;
  };
  platform: string;
  cpuCount: number;
  cpuFree: number;
  allLoadavg: string;
  freemem: number;
  freememPercent: number;
  totalmem: number;
  sysUptime: number;
  processUptime: number;
  processes: string[];
}
export interface IElectronAPI {
  subscribeStatistics: (callback: (statistics: IStatistics) => void) => void;
  getStaticData: () => void;
}

declare global {
  interface Window {
    electron: IElectronAPI;
  }
}
