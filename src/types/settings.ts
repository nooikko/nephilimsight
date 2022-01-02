interface MatchResultI {
  maxVal: number;
  maxLoc: {
    x: number;
    y: number;
  };
}

export interface AvailableSettingsI {
  TEMP_DIR_NAME: string;
  SETTINGS_FILE_NAME: string;
  INSTRUMENTATION_KEY: string;
  USER_ID: string;
  DISABLE_LOGGING: boolean;
  DEBUG: boolean;
  SCREEN: number;
  FREQUENCY: number;
  CHAT_AREA
  : {
    trPoint: MatchResultI['maxLoc'];
    blPoint: MatchResultI['maxLoc'];
  }
  [key: string]: any;
}

export interface AvailableSettingsUpdateI {
  SCREEN?: number;
  FREQUENCY?: number;
  USER_ID?: string;
  CHAT_AREA?: {
    trPoint: MatchResultI['maxLoc'];
    blPoint: MatchResultI['maxLoc'];
  }
  [key: string]: any;
}