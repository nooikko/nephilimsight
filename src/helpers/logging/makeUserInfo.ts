import { v4 as uuid } from 'uuid';

export const makeUserInfo = () => {
  return {
    userId: uuid(),
  };
};