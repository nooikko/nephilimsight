import { confirmChat, getFullCache, selectScreen } from '../../helpers';
import { getScreen, getScreens } from '../../helpers/image-processing';
import { runParseImages } from '../../ocr';
import { findChat } from '../../opencv';

interface ListenerI {
  channel: string;
  callback: (data?: any) => any;
}

export const listeners: ListenerI[] = [
  {
    channel: 'get-configuration',
    callback: getFullCache,
  },
  {
    channel: 'get-all-screens',
    callback: getScreens,
  },
  {
    channel: 'get-screen',
    callback: getScreen,
  },
  {
    channel: 'find-chat',
    callback: findChat,
  },
  {
    channel: 'confirm-chat',
    callback: confirmChat,
  },
  {
    channel: 'read-chat',
    callback: runParseImages,
  },
  {
    channel: 'select-screen',
    callback: selectScreen,
  },
];