import cache from 'memory-cache';

export const getFullCache = () => {
  const output = cache.keys().reduce((acc, cur) => {
    acc[cur] = cache.get(cur);

    return acc;
  }, {});

  return output;
};