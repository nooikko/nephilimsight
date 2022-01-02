// @ts-nocheck
import { JimpsI, MatchResultI, ResultsI, MatrixesI, TemplateMatcherOutputI } from '../types';


export class TemplateMatcher {
  trJimp: JimpsI['trJimp'];
  blJimp: JimpsI['blJimp'];
  srcJimp: JimpsI['srcJimp'];
  scale: number;

  constructor(jimps: JimpsI, scale: number) {
    this.trJimp = jimps.trJimp;
    this.blJimp = jimps.blJimp;
    this.srcJimp = jimps.srcJimp;
    this.scale = scale;
  }

  scaleJimps() {
    const scale = (current: JimpsI['string']) => {
      const height = current.getHeight();
      const width = current.getWidth();
      const newWidth = parseInt((width * this.scale).toFixed(0));
      const newHeight = parseInt((height * this.scale).toFixed(0));

      current.resize(newWidth, newHeight);
    };

    scale(this.trJimp);
    scale(this.blJimp);

  }

  getMatrixes(): MatrixesI {
    const trMatrix = cv.matFromImageData(this.trJimp.bitmap);
    const blMatrix = cv.matFromImageData(this.blJimp.bitmap);
    const srcMatrix = cv.matFromImageData(this.srcJimp.bitmap);

    return {
      trMatrix,
      blMatrix,
      srcMatrix,
    };
  }

  match(matrixes: MatrixesI): ResultsI {
    const matchTemplate = (source: any, template: any) => {
      const dst = new cv.Mat();
      const mask = new cv.Mat();

      cv.matchTemplate(source, template, dst, cv.TM_CCOEFF_NORMED, mask);

      const result = cv.minMaxLoc(dst, mask);

      dst.delete();
      mask.delete();

      return result;
    };

    const trResults: MatchResultI = matchTemplate(matrixes.srcMatrix, matrixes.trMatrix);
    const blResults: MatchResultI = matchTemplate(matrixes.srcMatrix, matrixes.blMatrix);

    return {
      trResults,
      blResults,
    };
  }

  // We are adding 5 to trPoint.x because Diablo can overflow the edge of the chat box with punctuation
  // We are add (lowering) 15 from trPoint.y because the expand chat button is not perfectly aligned with the top of chat
  buildOutput(matrixes: MatrixesI, results: ResultsI): TemplateMatcherOutputI {
    return {
      confidence: (results.trResults.maxVal + results.blResults.maxVal) / 2,
      trPoint: {
        x: results.trResults.maxLoc.x + 5 + matrixes.trMatrix.cols,
        y: results.trResults.maxLoc.y + matrixes.trMatrix.rows + 15,
      },
      blPoint: {
        x: results.blResults.maxLoc.x + matrixes.blMatrix.cols,
        y: results.blResults.maxLoc.y - 5,
      },
      scale: this.scale,
    };
  }

  cleanup(matrixes: MatrixesI) {
    Object.keys(matrixes).forEach((key) => {
      matrixes[key].delete();
    });
  }

  run() {
    this.scaleJimps();
    const matrixes = this.getMatrixes();
    const results = this.match(matrixes);
    const output = this.buildOutput(matrixes, results);
    this.cleanup(matrixes);
    return output;
  }

}