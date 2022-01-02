import fs from 'fs';
import cache from 'memory-cache';
import { getFullCache, createTempDir } from '..';
import { getSettingsFile, logger, loadUserData, loadSessionData } from '..';
import { createSettingsFile } from '../file-system/createSettingsFile';
import { defaults } from './defaults';

export const loadConfig = () => {
  loadSessionData();
  createTempDir();

  const settingsFile = getSettingsFile();
  const settingsFileExists = fs.existsSync(settingsFile);
  let settingsFromFile: string;
  if (settingsFileExists) {
    settingsFromFile = fs.readFileSync(settingsFile).toString();
  } else  {
    logger.event('loadconfig', 'No settings file detected');
    logger.event('loadconfig', 'Saving environment keys to file');

    try {
      createSettingsFile(defaults);
      logger.event('loadconfig', 'Wrote memory only cache to settings file');
    } catch (error: any) {
      const message = `Attempt to write memory settings to ${settingsFile} and failed`;
      logger.event('loadconfig', message);
      logger.error('loadconfig', error);
      throw error;
    }

    Object.keys(defaults).forEach((key) => {
      cache.put(key, defaults[key]);
    });

    logger.event('loadconfig', 'Established cache using only preset values from environment');

    return;
  }

  const jsonFromFile = JSON.parse(settingsFromFile);
  const jsonKeys = Object.keys(jsonFromFile);

  const missingKeys = Object.keys(defaults).reduce((acc, cur) => {

    if (!jsonKeys.includes(cur)) {
      acc.push(cur);
    }

    return acc;
  }, [] as string[]);

  jsonKeys.forEach((key) => {
    cache.put(key, jsonFromFile[key]);
  });

  if (missingKeys.length) {
    missingKeys.forEach((key) => {
      cache.put(key, defaults[key]);
    });

    logger.event('loadconfig', 'Established cache using a mix of file values and environment values');

    try {
      createSettingsFile(getFullCache());
      logger.event('loadconfig', 'Wrote mixed value cache to settings file');
    } catch (error: any) {
      const message = `Attempt to write mixed settings to ${settingsFile} and failed`;
      logger.event('loadconfig', message);
      logger.error('loadconfig', error);
      throw error;
    }
  } else {
    logger.event('loadconfig', 'Established cache using only values from settings file');
  }

  loadUserData();
};