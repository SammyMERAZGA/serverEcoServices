import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

export const auth = Router();
const prisma = new PrismaClient();

// Voir les middlewares : https://www.youtube.com/watch?v=zgn7EhMgkIo&ab_channel=EternalProgramming

auth.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return res
      .status(400)
      .json({ success: false, error: "Cet utilisateur n'existe pas !" });
  }

  try {
    if (await argon2.verify(user.password, password)) {
      const accessToken = jwt.sign({ userId: user.id }, "secret");

      return res.status(200).json({ success: true, accessToken: accessToken });
    } else {
      return res
        .status(400)
        .json({ success: false, error: "Mot de passe incorrect !" });
    }
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, error: "Une erreur est survenue !" });
  }
});

auth.post("/api/register", async (req, res) => {
  const { email, username, password } = req.body;

  const result = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (result) {
    return res
      .status(400)
      .json({ success: false, error: "Cet utilisateur existe déjà !" });
  }

  const hashedPassword = await argon2.hash(password);

  const user = await prisma.user.create({
    data: {
      email: email,
      username: username,
      password: hashedPassword,
    },
  });

  const accessToken = jwt.sign({ userId: user.id }, "secret");

  return res.status(200).json({ success: true, accessToken: accessToken });
});

export default auth;
