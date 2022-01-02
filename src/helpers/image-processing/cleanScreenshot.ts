import Jimp from 'jimp';
import { logger } from '..';

export const cleanScreenshot = (screenshot: Buffer): Promise<Buffer> => {
  try {
    return new Promise((resolve, reject) => {
      Jimp.read(screenshot, (error, value) => {
        if (error) {
          reject(error);
        }

        value
        .posterize(20)
        .contrast(0.1)
        .grayscale()
        .dither565()
        .invert()
        .contrast(0.8)
        .getBuffer(Jimp.MIME_JPEG, (err, value) => {
          if (err) {
            reject(err);
          }

          resolve(value);
        });
      });
    });
  } catch (error: any) {
    logger.error('cleanscreenshot', error);
    throw error;
  }
};