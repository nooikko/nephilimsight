import cache from 'memory-cache';
import { makeUserInfo } from '..';
import { updateAndSaveCache } from '../cache/updateAndSaveCache';

export const loadUserData = () => {
  const cachedUserId = cache.get('USER_ID');

  if (!cachedUserId || cachedUserId === 'unset') {
    const userData = makeUserInfo();
    updateAndSaveCache({ USER_ID: userData.userId });
  }

};