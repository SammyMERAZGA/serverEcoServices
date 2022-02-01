import { Router } from "express";
import { prisma } from "../config/prismaConfig";


const router = Router();

router.get("/api/categories", async (req: any, res: any) => {
  const allCategories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      icone: true,
      image: true,
    },
  });
  res.status(200).send(allCategories);
});

router.post(`/api/createCategory`, async (req: any, res: any) => {
  const { name, icone, image } = req.body;
  const createCategory = await prisma.category.create({
    data: {
      name: name,
      icone: icone,
      image: image,
    },
  });
  res.json(createCategory);
});

export default router;