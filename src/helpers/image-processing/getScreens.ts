import screenshot from 'screenshot-desktop';
import cache from 'memory-cache';
import { getScreen } from '.';
import { logger } from '..';

export const getScreens = async () => {
  try {
    const availableScreens = await screenshot.listDisplays();
    const screenshots = await Promise.all(availableScreens.map(async (screen) => {
      const picture = await getScreen(screen.id as unknown as string);

      return {
        ...screen,
        buffer: picture,
        base64: picture?.toString('base64'),
        current: screen.id === cache.get('SCREEN'),
      };
    }));

    return screenshots;
  } catch (error: any) {
    logger.error('getscreens', error);
  }
};