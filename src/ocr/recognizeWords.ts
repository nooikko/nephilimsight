import Tesseract from 'tesseract.js';

export const recognizeWords = async (image: Buffer) => {
  return Tesseract.recognize(image, 'eng');
};