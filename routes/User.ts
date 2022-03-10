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

router.put("/api/updateUser/:id", async (req: any, res: any) => {
  const { id } = req.params;
  const { username, type, admin } = req.body;
  const updateUser = await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      username: username,
      type: type,
      admin: admin,
    },
  });
  res.status(200).send(updateUser);
});

router.delete("/api/user/:id", async (req: any, res: any) => {
  const { id } = req.params;
  const deleteUser = await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.status(200).send(deleteUser);
});

export default router;
