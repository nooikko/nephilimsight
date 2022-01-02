import cache from 'memory-cache';
import { updateAndSaveCache } from '../cache/updateAndSaveCache';
import { makeSessionData } from '../logging/makeSessionData';

export const loadSessionData = () => {
  const cachedSessionId = cache.get('SESSION_ID');

  if (!cachedSessionId) {
    const session = makeSessionData();
    updateAndSaveCache({ SESSION_ID: session.sessionId }, false);
  }

};