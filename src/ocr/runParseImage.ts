import cache from 'memory-cache';
import { getScreen } from '../helpers/image-processing';
import { logger } from '../helpers';
import { parseImage } from '.';

export const runParseImages = async () => {
  try {
    const chatArea = cache.get('CHAT_AREA');
    const screen = cache.get('SCREEN');
    const screenshot = await getScreen(screen);

    if (screenshot) {
      const output = await parseImage(screenshot?.toString('base64'), chatArea);
      return output;
    }

    logger.local('runparseimage', 'Attempted to parse image but no screenshot was found');

  } catch (e) {
    throw e;
  }
};