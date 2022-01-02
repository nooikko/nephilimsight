import cache from 'memory-cache';

export const getFullCache = () => {
  const output = cache.keys().reduce((acc, cur) => {
    acc[cur] = cache.get(cur);

    return acc;
  }, {});
  console.log('🚀 ~ file: getFullCache.ts ~ line 9 ~ output ~ output', output);

  return output;
};