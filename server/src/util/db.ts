import { Sequelize } from 'sequelize-typescript';
import { logger } from './logging';
import User from '../model/user';
import Transaction from '../model/transaction';

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

db.addModels([User, Transaction ])

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
