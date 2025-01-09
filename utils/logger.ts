const isDev = process.env.NODE_ENV !== 'production';

const safeLog = (message: string) => {
  if (isDev && process.stdout) {
    process.stdout.write(`${message}\n`);
  }
};

const safeError = (message: string, error?: any) => {
  if (isDev && process.stderr) {
    process.stderr.write(`${message}${error ? ` ${error}` : ''}\n`);
  }
};

const logger = {
  info: (message: string) => {
    safeLog(message);
  },
  error: (message: string, error?: any) => {
    safeError(message, error);
  },
};

export default logger;
