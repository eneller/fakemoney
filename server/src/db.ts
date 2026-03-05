import { Sequelize } from 'sequelize';

// Initialize Sequelize
const db = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'postgres',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'pass',
  logging: false, // Disable logging in production
});

// Test the connection
async function testConnection() {
  try {
    await db.authenticate();
    console.log('✅ Database connection established.');
  } catch (err) {
    console.error('❌ Unable to connect to the database:', err);
    process.exit(1); // Exit if DB connection fails
  }
}

// Export Sequelize instance and models
export { db, testConnection };
