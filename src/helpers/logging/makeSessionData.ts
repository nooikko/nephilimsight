import { v4 as uuid } from 'uuid';

export const makeSessionData = () => {
  return {
    sessionId: uuid(),
  };
};