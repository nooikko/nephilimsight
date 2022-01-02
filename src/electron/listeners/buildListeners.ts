import { listeners } from '.';

export const buildListeners = (ipcMain: Electron.IpcMain) => {
  listeners.forEach((({ channel, callback }) => {

    ipcMain.on(channel, async (event, message) => {
      try {
        const data = await callback(message);
        event.reply(channel, data);
      } catch (e) {
        event.reply(channel, {
          success: false,
          message: 'Task failed',
          error: e,
        });
      }
    });

  }));
};