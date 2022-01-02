import {exec} from 'child_process';

export const detectGame = () => {
  return new Promise((resolve, reject) => {
    exec('tasklist | findstr "Diablo III"', function (err, stdout, stderr) {
      resolve(stdout.includes('Diablo III'));
      if (err) {
        reject(err);
      }

      if (stderr) {
        reject(err);
      }

    });
  });


};