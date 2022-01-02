import sharp from 'sharp';
import { v4 as uuid4 } from 'uuid';
import { logger } from '..';

interface TrimConfig {
  width: number;
  height: number;
  left: number;
  top: number;
}

export const trimScreenshot = (
  screenshot: Buffer,
  trimConfig: TrimConfig,
) => {
  const channels = ['red', 'green', 'blue'];

  try {
    return channels.map((channel) => {
      return sharp(screenshot)
      .extract(trimConfig)
      .extractChannel(channel)
      .toBuffer();
    });
  } catch (error: any) {
    const id = uuid4();
    logger.event(`trimscreenshot-${id}`, {...trimConfig});
    logger.error(`trimscreenshot-${id}`, 'Failed to trim screenshot');
  }

};