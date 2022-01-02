import { AvailableSettingsI } from '../../types';

// These are used if it is the first time starting the application
export const defaults: AvailableSettingsI = {
  TEMP_DIR_NAME: 'nephilimsight',
  SETTINGS_FILE_NAME: 'settings.json',
  INSTRUMENTATION_KEY: 'InstrumentationKey=136311c7-a2d0-4886-96bd-ea9435085792',
  USER_ID: 'unset',
  DISABLE_LOGGING: true,
  DEBUG: true,
  SCREEN: 0,
  FREQUENCY: 1000,
  CHAT_AREA: {
    trPoint: {
      x: 0,
      y: 0,
    },
    blPoint: {
      x: 0,
      y: 0,
    },
  },
};