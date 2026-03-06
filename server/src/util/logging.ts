import winston, { format } from "winston";
import dotenv from 'dotenv';

dotenv.config();
const logger = winston.createLogger({
  level:'info',
})
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: format.combine(
      format.colorize({all: true}),
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`),
    )

}));
}

// Export Sequelize instance and models
export { logger };
