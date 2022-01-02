import os from 'os';
import path from 'path';
import { systemConfig, logger } from '..';

export const getTempDir = () => {
  const tempDirectory = os.tmpdir();

  if (!systemConfig.TEMP_DIR_NAME) {
    const error = 'Attempted to get temp directory name but TEMP_DIR_NAME environment varialbe is not set';
    logger.error('getTempDir', error);
    throw new Error(error);
  }

  return path.join(tempDirectory, '..', systemConfig.TEMP_DIR_NAME);

};