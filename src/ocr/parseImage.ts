// @ts-nocheck
import { recognizeWords, getMostWords } from '.';
import { trimScreenshot, cleanScreenshot } from '../helpers/image-processing';
import { AvailableSettingsI } from '../types';

export const parseImage = async (image: string, chatArea: AvailableSettingsI['CHAT_AREA']) => {
  const imageBuffer = Buffer.from(image, 'base64');
  const trimmed = await Promise.all(trimScreenshot(imageBuffer, {
    left: chatArea.blPoint.x,
    top: chatArea.trPoint.y,
    width: chatArea.trPoint.x - chatArea.blPoint.x,
    height: chatArea.blPoint.y - chatArea.trPoint.y,
  }));

  const cleaned = await Promise.all(trimmed.map(i => cleanScreenshot(i)));

  const ocrOutput = await Promise.all(cleaned.map(i => recognizeWords(i)));

  const mostWords = getMostWords(ocrOutput);

  return {
    mostWords,
    ...ocrOutput,
  };
};

