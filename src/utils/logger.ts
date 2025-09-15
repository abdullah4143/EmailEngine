// Simple console logger for production use
export const logInfo = (message: string, meta?: any) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] INFO: ${message}`, meta ? JSON.stringify(meta, null, 2) : '');
};

export const logError = (message: string, error?: any) => {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] ERROR: ${message}`, error ? error.stack || error : '');
};

export const logWarn = (message: string, meta?: any) => {
  const timestamp = new Date().toISOString();
  console.warn(`[${timestamp}] WARN: ${message}`, meta ? JSON.stringify(meta, null, 2) : '');
};

export const logDebug = (message: string, meta?: any) => {
  if (process.env.NODE_ENV === 'development') {
    const timestamp = new Date().toISOString();
    console.debug(`[${timestamp}] DEBUG: ${message}`, meta ? JSON.stringify(meta, null, 2) : '');
  }
};