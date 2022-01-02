import fs from 'fs';
import { getTempDir } from '.';
import { logger } from '..';

export const createTempDir = () => {
  const tempDir = getTempDir();

  const tempDirExist = fs.existsSync(tempDir);

  if (!tempDirExist) {
    try {
      fs.mkdirSync(tempDir, {recursive: true});
      logger.event('createtempdir', `Successfully created temp directory ${tempDir}`);
    } catch (error) {
      logger.error('createtempdir', error as unknown as string);
    }

  } else {
    logger.event('createtempdir', `Temp directory (${tempDir}) already exists`);
  }
};