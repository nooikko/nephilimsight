export interface SystemConfigI {
  TEMP_DIR_NAME: string;
  SETTINGS_FILE_NAME: string;
  INSTRUMENTATION_KEY: string;
  DISABLE_LOGGING: boolean;
  DEBUG: boolean;
}

interface MatchAreaI {
  x: number;
  y: number;
}

export interface ChatAreaI {
  confidence: number;
  trPoint: MatchAreaI;
  picture: string;
  blPoint: MatchAreaI;
  scale: number;
}

export interface ConfigurableSettingsI {
  SCREEN?: number;
  FREQUENCY: number;
  CHAT_AREA?: ChatAreaI;
  USER_ID?: string;
  RETENTION_COUNT: number;
  [key: string]: number | ChatAreaI | string | undefined;
}

export interface ConfigurableSettingsUpdateI {
  SCREEN?: number;
  FREQUENCY?: number;
  CHAT_AREA?: ChatAreaI;
  USER_ID?: string;
  [key: string]: number | ChatAreaI | string | undefined;
}
