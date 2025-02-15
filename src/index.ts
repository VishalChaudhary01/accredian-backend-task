import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import referralRoutes from "./routes/referral.route";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/referrals', referralRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Healthy server");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
