import path from 'path';
import { runService } from '../node';
import { getScreen } from '../helpers/image-processing';
import { ChatAreaI } from '../types';
import { updateAndSaveCache } from '../helpers/cache/updateAndSaveCache';
import { logger } from '../helpers';

export const findChat = async () => {
  logger.event('findchat', {
    foo: 'bar',
    message: 'Initialized Find Chat',
  });
  // TODO: Get current screen from cache
  try {
    const screen = '\\\\.\\DISPLAY1';
    const screenshot = await getScreen(screen);
    const output = await runService(path.join(__dirname, 'openCVInstance.js'), {screenshot: screenshot?.toString('base64')});
    const outputType = output as ChatAreaI;
    updateAndSaveCache({
      CHAT_AREA: outputType,
    });

    logger.event('findchat', 'Completed opencv processing. Returning output');

    return output;
  } catch (e: any) {
    logger.error('findchat', e.message);
    throw e;
  }
};