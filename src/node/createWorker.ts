import { Worker } from 'worker_threads';

export const runService = (path: string, workerData?: any) => {

  return new Promise((resolve, reject) => {

    const worker = new Worker(path, { workerData });
    worker.on('message', (data) => {
      worker.terminate();
      resolve(data);
    });
    worker.on('error', (error) => {
      worker.terminate();
      reject(error);
    });
    worker.on('exit', (code) => {
      worker.terminate();
      if (code !== 0) {
        reject(new Error(`stopped with  ${code} exit code`));
      }
    });
  });

};