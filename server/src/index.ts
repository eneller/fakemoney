import express, { Express, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import transactionsRouter from './routes/transactions';
import authRouter from './routes/auth';
import sendRouter from './routes/send';
import dotenv from 'dotenv';
dotenv.config({quiet: true});
import { db, testConnection } from "./util/db";
import { logger } from "./util/logging";
import { setKeyFromEnv } from "./util/auth";

const app: Express = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "OK" });
});

app.use('/api/auth', authRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/send', sendRouter);

const PORT: number = parseInt(process.env.FM_PORT as string) || 3000;

async function startServer() {
  await testConnection();

  // Sync models (use migrations in production!)
  // Use { force: true } to drop and recreate tables (development only!)
  await db.sync({ alter: true });
  await setKeyFromEnv();

  app.listen(PORT, () => {
    logger.info(`🚀 Backend Server running on http://localhost:${PORT}`);
  });
}
startServer().catch((err) => {
  logger.error('Failed to start server:', err);
  process.exit(1);
});
