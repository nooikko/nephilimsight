import path from 'path';
import { getTempDir } from '.';
import { defaults, logger } from '..';


export const getSettingsFile = () => {
  if (!defaults.SETTINGS_FILE_NAME) {
    const error = 'Attepted to get settings file name but SETTINGS_FILE_NAME environment variable is not set';
    logger.error('getsettingsfile', error);
    throw new Error(error);
  }

  return path.join(getTempDir(), defaults.SETTINGS_FILE_NAME);

};