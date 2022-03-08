import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Utilisateur non authentifié !" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Utilisateur non authentifié !" });
  }

  try {
    const decodedToken = jwt.verify(token, "secret");

    if (!decodedToken) {
      return res.status(401).json({ error: "Utilisateur non authentifié !" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ error: "Utilisateur non authentifié !" });
  }
};

export default isAuthenticated;
