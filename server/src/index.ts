import express, { Express, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import transactionsRouter from './routes/transactions';
import authRouter from './routes/auth';
import { db, testConnection } from "./util/db";
import { logger } from "./util/logging";

const app: Express = express();
app.use(cors({ origin: 'http://localhost:4200', credentials: true}));
app.use(cookieParser());
app.use(express.json());

app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "OK" });
});

app.use('/api/transactions', transactionsRouter);
app.use('/api/auth', authRouter);

const PORT: number = parseInt(process.env.PORT as string) || 3000;

// Start server after DB connection is established
async function startServer() {
  await testConnection(); // Test DB connection first

  // Sync models (use migrations in production!)
  await db.sync({ alter: true }); // Use { force: true } to drop and recreate tables (development only!)

  app.listen(PORT, () => {
    logger.info(`🚀 Backend Server running on http://localhost:${PORT}`);
  });
}
startServer().catch((err) => {
  logger.error('Failed to start server:', err);
  process.exit(1);
});
