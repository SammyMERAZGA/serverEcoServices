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

// router.delete("/api/users/:id", async (req: any, res: any) => {
//   const { id } = req.params;
//   const user = await prisma.user.delete({
//     where: {
//       id: id,
//     },
//   });
//   res.status(200).send(user);
// });

export default router;