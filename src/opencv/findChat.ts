import path from 'path';
import cache from 'memory-cache';
import { runService } from '../node';
import { getScreen } from '../helpers/image-processing';
import { ChatAreaI } from '../types';
import { logger } from '../helpers';

export const findChat = async () => {
  // TODO: Get current screen from cache
  try {
    const screen = cache.get('SCREEN');

    if (!screen) {
      logger.error('findchat', 'Attempted to find chat but no screen has been selected');
      return;
    }

    const screenshot = await getScreen(screen);
    const output = await runService(path.join(__dirname, 'openCVInstance.js'), {screenshot: screenshot?.toString('base64')});
    const outputType = output as ChatAreaI;
    logger.event('findchat', 'Completed opencv processing. Returning output');
    return outputType;
  } catch (e: any) {
    logger.error('findchat', e.message);
    throw e;
  }
};