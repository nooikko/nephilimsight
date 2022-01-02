import fs from 'fs';
import { getSettingsFile } from '.';
import { logger } from '..';
import { AvailableSettingsI } from '../../types';


export const createSettingsFile = (defaults: AvailableSettingsI) => {
  const settingsFile = getSettingsFile();

  const settingsFileExists = fs.existsSync(settingsFile);
  console.log('🚀 ~ file: createSettingsFile.ts ~ line 11 ~ createSettingsFile ~ settingsFileExists', settingsFileExists);

  if (!settingsFileExists) {
    try {
      fs.writeFileSync(settingsFile, JSON.stringify(defaults, null, 2));
      logger.event('createsettingsfile',`Successfully created settings file ${settingsFile}`);
    } catch (error: any) {
      logger.event('createsettingsfile', `Failed to create ${settingsFile}`);
      logger.error('createsettingsfile', error);
    }
  } else {
    logger.event('createsettingsfile',`Settings File (${settingsFile}) already exists`);
  }
};