import cache from 'memory-cache';
import fs from 'fs';
import { ConfigurableSettingsUpdateI } from '../../types';
import {logger, getSettingsFile, getFullCache} from '..';

export const updateAndSaveCache = (data: ConfigurableSettingsUpdateI, save = true) => {
  Object.keys(data).forEach((key) => {
    cache.put(key, data[key]);
  });

  if (save) {
    const settingsFile = getSettingsFile();
    const settingsFileExists = fs.existsSync(settingsFile);

    if (!settingsFileExists) {
      const message = 'Attempted to save updated cache but settings file does not exist';
      logger.error('updateandsavecache', message);
      throw new Error(message);
    }

    try {
      fs.writeFileSync(settingsFile, JSON.stringify(getFullCache()));
      logger.event('updateandsavecache', 'Rewrote settings file values based on cache update');
    } catch (error: any) {
      const message = `Attempt to rewrite settings file values based on cache update to ${settingsFile} and failed`;
      logger.event('updateandsavecache', message);
      logger.error('updateandsavecache', error);
      throw error;
    }
  }
};