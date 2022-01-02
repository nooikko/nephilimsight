import Tesseract from 'tesseract.js';

export const getConfidentLines = (results: Tesseract.RecognizeResult[]) => {
  const bestResult = results.reduce((acc, cur) => {
    if (!Object.keys(acc).length) {
      return cur;
    }

    if (cur.data.confidence > acc.data.confidence) {
      return cur;
    }

    return acc;
  }, {} as Tesseract.RecognizeResult);

  const worseResultsLines = results
    .filter((result) => result.jobId !== bestResult.jobId)
    .map(result => result.data.lines)
    .flat(1);

  const aggregateResults = bestResult.data.lines.reduce((acc, cur) => {
    // console.log(`Checking index: ${index} of ${bestResult.jobId}`);
    const matchingLines = worseResultsLines.filter(({ bbox, baseline }) => {
      const bbox0 = Math.abs(bbox.y0 - cur.bbox.y0) < 4;
      const bbox1 = (Math.abs(bbox.y1 - cur.bbox.y1) < 4 && Math.abs(bbox.y0 - cur.bbox.y0) < 15);
      const baseline0 = baseline.y0 === cur.baseline.y0;
      return bbox0 || bbox1 || baseline0;
    });
    if (matchingLines.length > 2) {
      console.log(`================= Found ${matchingLines.length} matches`);
      console.log(matchingLines.map((line) => ({ baseline: line.baseline, bbox: line.bbox })));
    }

    if (!matchingLines.length) {
      acc.push(cur);
    } else {
      const best = [...matchingLines].reduce((accc, curr) => {

        if (curr.confidence > accc.confidence) {
          return curr;
        }

        return accc;
      }, cur as Tesseract.RecognizeResult['data']['lines'][number]);
      acc.push(best);
    }
    return acc;
  }, [] as Tesseract.RecognizeResult['data']['lines']);

  return aggregateResults;
};