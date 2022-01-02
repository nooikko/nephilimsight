// @ts-nocheck
import { parentPort, workerData } from 'worker_threads';
import path from 'path';
import { ChatDetector } from './classes';
import { logger } from '../helpers';
logger.init();


// Define a global variable 'Module' with a method 'onRuntimeInitialized':
global.Module = {
  onRuntimeInitialized() {
    const detector = new ChatDetector({ source: workerData.screenshot });
    detector.run()
      .then(data => {
        logger.event('opencvinstance', 'Got data base from detector');
        parentPort?.postMessage(data);
      })
      .catch((error) => {
        logger.error('opencvinstance', error);
        throw error;
      });
  },
};
// Load 'opencv.js' assigning the value to the global variable 'cv'
global.cv = require(path.join(__dirname, '../extensions/opencv.js'));