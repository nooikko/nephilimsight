import Jimp from 'jimp';

export interface JimpsI {
  trJimp: Jimp;
  blJimp: Jimp;
  srcJimp: Jimp;
  [key: string]: Jimp;
}

export interface MatrixesI {
  trMatrix: MatrixI;
  blMatrix: MatrixI;
  srcMatrix: MatrixI;
}

export interface MatrixI {
  rows: number;
  cols: number;
}

export interface ResultsI {
  trResults: MatchResultI;
  blResults: MatchResultI;
}

export interface MatchResultI {
  maxVal: number;
  maxLoc: {
    x: number;
    y: number;
  };
}

export interface TemplateMatcherOutputI {
  confidence: number;
  trPoint: MatchResultI['maxLoc'];
  blPoint: MatchResultI['maxLoc'];
  scale: number;
}