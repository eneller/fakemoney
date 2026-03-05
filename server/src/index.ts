import express, { Express, Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import transactionsRouter from './routes/transactions';


dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "OK" });
});

app.use('/api/transactions', transactionsRouter);

const PORT: number = parseInt(process.env.PORT as string) || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
