import { Router } from "express";
import { prisma } from "../config/prismaConfig";


const router = Router();

router.get("/api/categories", async (req, res) => {
  const allCategories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      icone: true,
      color: true,
      url: true
    },
  });
  res.status(200).send(allCategories);
});

export default router;