import { workerData, parentPort } from 'worker_threads';

if (parentPort) {
  parentPort.postMessage({ welcome: workerData });
} else {
  throw new Error('No parent port');
}