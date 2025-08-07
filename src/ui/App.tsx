import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import type { IStatistics } from "./vite-env";

function App() {
  const [count, setCount] = useState(0);
  const [latestStats, setLatestStats] = useState<IStatistics | null>(null);
  const [cpuUsageHistory, setCpuUsageHistory] = useState<number[]>([]);

  // fetching the data from Electron js Backend
  useEffect(() => {
    window.electron.getStaticData();
    window.electron.subscribeStatistics((stats) => {
      setLatestStats(stats);
      // console.log(stats);
    });
  }, []);

  const handleShowCpuUsage = () => {
    if (latestStats?.cpuUsage) {
      setCpuUsageHistory((prevHistory) => [
        ...prevHistory,
        latestStats.cpuUsage,
      ]);
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + You</h1>
      <p>hi i'm here </p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={handleShowCpuUsage}>Show Current CPU Usage</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      {cpuUsageHistory.length > 0 && (
        <div>
          <h3>CPU Usage History (on click):</h3>
          <ul>
            {cpuUsageHistory.map((usage, index) => (
              <li key={index}>{(usage * 100).toFixed(2)}%</li>
            ))}
          </ul>
        </div>
      )}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
