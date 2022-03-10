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
      category: true,
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
      price: parseInt(price),
    },
  });
  res.json(createProduct);
});

// CATEGORIES

router.get("/api/homeProducts", async (req: any, res: any) => {
  const homeProducts = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      description2: true,
      image: true,
      quantity: true,
    },
    where: {
      category: "Maison"
    }
  });
  res.status(200).send(homeProducts);
});

router.get("/api/productCategory", async (req: any, res: any) => {
  const productCategory = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      description2: true,
      image: true,
      quantity: true,
    },
    where: {
      category: "Produits"
    }
  });
  res.status(200).send(productCategory);
});

router.get("/api/packs", async (req: any, res: any) => {
  const packs = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      description2: true,
      image: true,
      quantity: true,
    },
    where: {
      category: "Packs"
    }
  });
  res.status(200).send(packs);
});

router.get("/api/others", async (req: any, res: any) => {
  const others = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      description2: true,
      image: true,
      quantity: true,
    },
    where: {
      category: "Autres"
    }
  });
  res.status(200).send(others);
});

export default router;
