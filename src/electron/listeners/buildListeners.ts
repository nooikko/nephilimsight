import { listeners } from '.';

export const buildListeners = (ipcMain: Electron.IpcMain) => {
  listeners.forEach((({ channel, callback }) => {

    ipcMain.on(channel, async (event, message) => {
      const data = await callback(message);
      event.reply(channel, data);
    });

  }));
};