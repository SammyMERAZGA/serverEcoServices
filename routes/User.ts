import { Router } from "express";
import { prisma } from "../config/prismaConfig";

const router = Router();

router.get("/api/users", async (req: any, res: any) => {
  const allUsers = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      type: true,
      admin: true,
    },
  });
  res.status(200).send(allUsers);
});

router.get("/api/user", async (req: any, res: any) => {
  const user = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      email: true,
      address: true,
      city: true,
      postalCode: true,
      country: true,
      biography: true,
    },
  });
  res.status(200).send(user);
});

router.delete("/api/user/:id", async (req: any, res: any) => {
  const { id } = req.params;
  const deleteUser = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  res.status(200).send(deleteUser);
});

export default router;
