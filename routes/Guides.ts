import { Router } from "express";
import { prisma } from "../config/prismaConfig";


const router = Router();

router.get("/api/guides", async (req: any, res: any) => {
  const allGuides = await prisma.guide.findMany({
    select: {
      id: true,
      title: true,
      image: true,
      description: true,
    },
  });
  res.status(200).send(allGuides);
});

router.post(`/api/createGuide`, async (req: any, res: any) => {
  const { title, image, description } = req.body;
  const createGuide = await prisma.guide.create({
    data: {
      title: title,
      image: image,
      description: description,
    },
  });
  res.json(createGuide);
});

export default router;