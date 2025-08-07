import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { isDev } from "./util.js";
import { getStaticData, pollresources } from "./Resources/os-utils.js";
import { getPreloadPath } from "./pathResolver.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      // preload: getPreloadPath(),
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(__dirname, "..", "dist-react", "index.html"));
  }
  pollresources(mainWindow);

  // TCP Protocol
  ipcMain.handle("getStaticData", () => {
    return getStaticData();
  });
});
