import winston from 'winston';

const { combine, timestamp, printf, colorize, errors } = winston.format;

const customFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

export const logger = winston.createLogger({
  level: 'info',
  format: combine(
    errors({ stack: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    customFormat
  ),
  transports: [
    new winston.transports.Console({
      format: combine(
        colorize(),
        customFormat
      )
    })
  ]
});

export class LoggerAdapter {
  static info(message: string) {
    logger.info(message);
  }
  static error(message: string, error?: any) {
    if (error) {
       logger.error(`${message} - ${error}`);
    } else {
       logger.error(message);
    }
  }
  static warn(message: string) {
    logger.warn(message);
  }
  static debug(message: string) {
    logger.debug(message);
  }
}
