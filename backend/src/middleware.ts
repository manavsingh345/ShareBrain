import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_PASSWORD) as { id: string };

    // Attach userId to request object
    //@ts-ignore
    req.userId = decoded.id;

    next();
  } catch (err) {
    console.error("❌ Invalid token:", err);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
