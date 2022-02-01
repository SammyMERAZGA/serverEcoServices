import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
// IMPORT ROUTES
import productsRoute from "../routes/Products";
import categoriesRoute from "../routes/Categories";
import guidesRoute from "../routes/Guides";
import { auth as authRoute } from "../routes/Auth";
// BACK OFFICE ROUTES
import userRoute from "../routes/User";
import quotationRoute from "../routes/Quotation";

const app = express();
dotenv.config();

const port = process.env.HTTP_PORT || 8000;
const allowedOrigins = ["http://localhost:3000"];
const options: cors.CorsOptions = { origin: allowedOrigins };
const prisma = new PrismaClient();

const main = async () => {
  app.get("/", (req, res) => res.send("Express + TypeScript Server"));

  app.use(cors(options));
  app.use(express.json());

  // ROUTES
  app.use(productsRoute);
  app.use(categoriesRoute);
  app.use(guidesRoute);
  app.use(authRoute);

  // BACK OFFICE
  app.use(userRoute);
  app.use(quotationRoute);

  app.listen(port, () => {
    return console.log(
      `⚡️[server]: Server is running at http://localhost:${port}`
    );
  });
};

main()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
