import Jimp from 'jimp';
import path from 'path';
import { JimpsI, TemplateMatcherOutputI } from '../types';
import { TemplateMatcher } from './TemplateMatcher';

interface ChatDetectorArgsI {
  source: string
}

export class ChatDetector {
  origSource: string;
  source: Buffer;

  constructor(args: ChatDetectorArgsI) {
    this.origSource = args.source;
    this.source = Buffer.from(args.source, 'base64');
  }


  createJimps(): Promise<JimpsI> {
    return new Promise(async (resolve, reject) => {
      try {
        const trJimp = await Jimp.read(path.join(__dirname, 'references/expand-icon.png'));
        const blJimp = await Jimp.read(path.join(__dirname, 'references/chat-bubble-icon.png'));
        const srcJimp = await Jimp.read(this.source);

        resolve({
          trJimp,
          blJimp,
          srcJimp,
        });
      } catch (error) {
        reject(error);
      }
    });
  }


  cloneJimps(jimps: JimpsI) {
    return Object.keys(jimps).reduce((acc, cur) => {
      acc[cur] = jimps[cur].clone();
      return acc;
    }, {} as JimpsI);
  }

  testSizes(jimps: JimpsI): Promise<TemplateMatcherOutputI[]> {
    return new Promise((resolve, reject) => {
      try {
        const output: TemplateMatcherOutputI[] = [];
        for (let scale = 1; scale > 0.4; scale -= 0.1) {
          const fixedScale = parseFloat((scale).toFixed(1));
          const matcher = new TemplateMatcher(jimps, fixedScale);
          output.push(matcher.run());
        }

        resolve(output);
      } catch (error) {
        reject(error);
      }
    });
  }

  getHighestConfidence(matches: TemplateMatcherOutputI[]) {
    const highestConfidence = Math.max(...matches.map(({ confidence }) => confidence));
    return matches.find(match => match.confidence === highestConfidence);
  }

  async run() {
    try {
      const jimps = await this.createJimps();
      const matches = await this.testSizes(jimps);
      const bestMatch = this.getHighestConfidence(matches);
      return {
        ...bestMatch,
        picture: this.origSource,
      };
    } catch (error) {
      throw error;
    }
  }
}