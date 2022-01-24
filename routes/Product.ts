import { Router } from "express";
import { prisma } from "../config/prismaConfig";

const router = Router();

router.get("/api/products", async (req: any, res: any) => {
  const allProducts = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      image: true,
      quantity: true,
      category: {
        select: {
          name: true,
          icone: true,
        },
      },
    },
  });
  res.status(200).send(allProducts);
});

export default router;
