import { Router } from "express";
import { prisma } from "../config/prismaConfig";


const router = Router();

router.get("/api/quotations", async (req: any, res: any) => {
  const allQuotations = await prisma.quotation.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      companyName: true,
      companyAddress: true,
      companyCity: true,
      companyPostalCode: true,
      service: true,
    },
  });
  res.status(200).send(allQuotations);
});

export default router;