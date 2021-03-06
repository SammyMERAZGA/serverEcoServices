import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import isAuthenticated from "../src/middlewares/isAuthenticated"

export const auth = Router();
const prisma = new PrismaClient();

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
  const { email, username, password, type } = req.body;

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
      type: type,
      email: email,
      username: username,
      password: hashedPassword,
    },
  });

  const accessToken = jwt.sign({ userId: user.id }, "secret");

  return res.status(200).json({ success: true, accessToken: accessToken });
});

auth.post("/api/logout", async (req, res) => {
  jwt.TokenExpiredError;
  return res.redirect(200, "/");
});

// auth.get("/protected", isAuthenticated, (req, res) => {
//   res.send("protected");
// });