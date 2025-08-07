export type StaticData = {
  totalStorage: number;
  cpuModel: string;
  totalMemoryGB: number;
};

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
  processes: string;
}

type EventPayloadMapping = {
  statistics: IStatistics;
  getStaticData: StaticData;
};

export interface IElectronAPI {
  subscribeStatistics: (callback: (statistics: IStatistics) => void) => void;
  getStaticData: () => Promise<StaticData>;
}

declare global {
  interface Window {
    electron: IElectronAPI;
  }
}
