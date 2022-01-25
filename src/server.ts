import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
// IMPORT ROUTES
import productsRoute from "../routes/Products";
import categoriesRoute from "../routes/Categories";
import guidesRoute from "../routes/Guides";

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
