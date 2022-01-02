import screenshot from 'screenshot-desktop';
import { logger } from '..';


export const getScreen = async (id: string) => {
  const screens = await screenshot.listDisplays();
  const screenIds = screens.map(({ id }) => id as unknown as string);

  if (!screenIds.includes(id)) {
    logger.error('getScreen', `Attempted to screenshot screen ${id} but could not identify it as an available screen`);
    return;
  }

  return screenshot({
    screen: id as unknown as number,
  });

};