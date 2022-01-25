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

export default router;