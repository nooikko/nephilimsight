import cache from 'memory-cache';

export const getRenderCache = () => {
  const keys: string[] = ['USER_ID', 'CHAT_AREA'];
  const output = keys.reduce((acc, cur) => {
    acc[cur] = cache.get(cur);

    return acc;
  }, {} as {[key: string]: any});

  return output;
};