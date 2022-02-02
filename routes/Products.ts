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
      description2: true,
      image: true,
      quantity: true,
      // category: {
      //   select: {
      //     name: true,
      //     icone: true,
      //   },
      // },
    },
  });
  res.status(200).send(allProducts);
});

router.post(`/api/createProduct`, async (req: any, res: any) => {
  const { name, description, image, price } = req.body;
  const createProduct = await prisma.product.create({
    data: {
      name: name,
      description: description,
      description2: description,
      image: image,
      price: price,
    },
  });
  res.json(createProduct);
});


export default router;
