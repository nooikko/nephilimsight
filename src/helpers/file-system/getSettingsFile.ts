import path from 'path';
import { getTempDir } from '.';
import { systemConfig, logger } from '..';


export const getSettingsFile = () => {
  if (!systemConfig.SETTINGS_FILE_NAME) {
    const error = 'Attepted to get settings file name but SETTINGS_FILE_NAME environment variable is not set';
    logger.error('getsettingsfile', error);
    throw new Error(error);
  }

  return path.join(getTempDir(), systemConfig.SETTINGS_FILE_NAME);

};