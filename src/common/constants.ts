import { z } from 'zod';

export const IPC_EVENTS = {
  CHANGE_BADGE_COUNT: 'CHANGE_BADGE_COUNT',
  CHANGE_TRAY: 'CHANGE_TRAY',
  CLOSE_WINDOW: 'CLOSE_WINDOW',
  MINIMIZE_WINDOW: 'MINIMIZE_WINDOW',
  OPEN_WINDOW: 'OPEN_WINDOW',
};

export const LOCAL_STORAGE_KEYS = {
  TOKEN: import.meta.env.VITE_ACCESS_TOKEN_KEY as string,
} as const;

export const METHODS = ['GET', 'POST', 'PUT', 'DELETE'] as const;

export const METHOD_ENUMS = z.enum(METHODS);
