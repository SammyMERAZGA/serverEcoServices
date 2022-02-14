import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// METHODE PAS BONNE CAR IL N'Y A PAS LA VERIFICATION DU USERID
// const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ error: "Utilisateur non authentifié !" });
//   }

//   const token = authHeader.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ error: "Utilisateur non authentifié !" });
//   }

//   try {
//     const decodedToken = jwt.verify(token, "secret");

//     if (!decodedToken) {
//       return res.status(401).json({ error: "Utilisateur non authentifié !" });
//     }

//     next();
//   } catch (err) {
//     return res.status(401).json({ error: "Utilisateur non authentifié !" });
//   }
// };

// export default isAuthenticated;

// export const isAuthenticated = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (!req.headers["authorization"]) {
//     return res
//       .status(400)
//       .json({ success: false, error: "Missing Authorization Header provided" });
//   }

//   const authHeader: string = req.headers["authorization"];
//   const authMethod: string = authHeader.split(" ")[0];
//   const accessToken: string = authHeader.split(" ")[1];

//   if (!authMethod || !accessToken) {
//     return res
//       .status(400)
//       .json({ success: false, error: "Invalid auth header" });
//   } else if (authMethod !== "Bearer") {
//     return res
//       .status(400)
//       .json({ success: false, error: "Invalid auth method" });
//   }

//   let tokenBody: any;

//   try {
//     tokenBody = jwt.verify(accessToken, "secret");
//   } catch {
//     return res.status(400).json({ success: false, error: "Invalid token" });
//   }

//   if (!tokenBody.userId) {
//     return res.status(400).json({ success: false, error: "Invalid token" });
//   }

//   const user = await prisma.user.findUnique({
//     where: {
//       id: tokenBody.userId,
//     },
//   });

//   if (!user) {
//     return res.status(400).json({ success: false, error: "User does not exist" });
//   }

//   req.User = user;

//   next();
// };
