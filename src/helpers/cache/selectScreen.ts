import screenshot from 'screenshot-desktop';
import { logger } from '..';
import { updateAndSaveCache } from './updateAndSaveCache';

export const selectScreen = async (screen: string) => {
  const screens = await screenshot.listDisplays();
  const screenIds = screens.map(({ id }) => id) as unknown as string[];

  const match = screenIds.find((id) => id === screen);

  if (match) {
    logger.event('selectscreen', {
      type: 'EVENT',
      success: true,
      message: 'Matched screen when attempting to select screen',
      provided: screen,
      matched: match,
      available: screenIds,
    });

    updateAndSaveCache({
      SCREEN: match as unknown as number,
    });
  } else {
    logger.event('selectscreen', {
      type: 'EVENT',
      success: false,
      message: 'Failed to match screen',
      provided: screen,
      available: screenIds,
    });
  }
};