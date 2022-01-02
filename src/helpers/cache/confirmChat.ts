import { updateAndSaveCache } from '.';
import { logger } from '..';
import { ConfigurableSettingsI } from '../../types';

export const confirmChat = (data: ConfigurableSettingsI['CHAT_AREA']) => {
  if (data) {
    updateAndSaveCache({
      CHAT_AREA: data,
    });

    return {
      status: 'ok',
      message: 'Successfully saved CHAT_AREA',
    };
  }

  logger.error('confirmchat', 'Attempted to save chat area but no data was provided');
};