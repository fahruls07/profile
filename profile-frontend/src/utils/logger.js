export const DEBUG = import.meta.env.VITE_DEBUG === 'true';

export function logInfo(...args) {
  if (DEBUG) console.log('[INFO]', ...args);
}

export function logWarn(...args) {
  if (DEBUG) console.warn('[WARN]', ...args);
}

export function logError(...args) {
  if (DEBUG) console.error('[ERROR]', ...args);
}
