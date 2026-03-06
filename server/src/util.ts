import { Sequelize } from 'sequelize';
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

// Initialize Sequelize
const db = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'postgres',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'pass',
  logging: logger.debug.bind(logger),
});

// Test the connection
async function testConnection() {
  try {
    await db.authenticate();
    logger.info('✅ Database connection established.');
  } catch (err) {
    logger.error('❌ Unable to connect to the database:', err);
    process.exit(1); // Exit if DB connection fails
  }
}

// Export Sequelize instance and models
export { logger, db, testConnection };
