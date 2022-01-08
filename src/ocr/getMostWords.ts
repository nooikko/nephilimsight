import Tesseract from 'tesseract.js';

const checkCharCodes = (word: string) => {
  const values = Array.from(word).reduce((acc, cur) => {
    const code = cur.charCodeAt(0);
    if (code !== 91 && code !== 92 && ((code > 65 && code < 90) || (code > 92 && code < 122))) {
      acc.valid++;
    } else {
      acc.invalid++;
    }

    return acc;
  }, {
    valid: 0,
    invalid: 0,
  });

  const valueToBeat = word.length / 3;

  if (values.invalid < valueToBeat) {
    return true;
  }

  return false;
};

const getForbiddenCharacters = () => {
  const forbiddenCharacters = ['\\', '~', '/', ',', '.', '&', '¥', '"', '\'', '?', '#', '$', '@', ')', '<', '>', '(', '[', ']', ':', '!', '+', '|', '¢', '\n', '«', '*', '-', '_', '*+*'];
  return forbiddenCharacters.reduce((acc, cur) => {
    if (!acc.includes(cur)) {
      acc.push(cur);
    }
    const variations = forbiddenCharacters.map((char) => cur + char);

    variations.forEach((variation) => {
      if (!acc.includes(variation)) {
        acc.push(variation);
      }
    });

    return acc;
  }, [] as string[]);
};

export const getMostWords = (results: Tesseract.RecognizeResult[]) => {
  const highestWords = results.reduce((acc, cur) => {

    const forbiddenVariations = getForbiddenCharacters();


    const letterPatters = new RegExp('^[A-Za-z]{1}$');
    const numberPatter = new RegExp('^[1-9]{1}$');
    const words = cur.data.words.filter((word) => {
      const charCodeCheck = checkCharCodes(word.text);
      if (charCodeCheck && !letterPatters.test(word.text) && !numberPatter.test(word.text) && !forbiddenVariations.includes(word.text)) {
        return word;
      }
    });

    if (words.length > acc.wordCount) {
      acc.jobId = cur.jobId;
      acc.wordCount = words.length;
    }

    return acc;
  }, {
    jobId: '',
    wordCount: 0,
  });

  return results.find(({ jobId }) => jobId === highestWords.jobId);
};