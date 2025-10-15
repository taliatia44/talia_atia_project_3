const jwt = require("jsonwebtoken");
import type { Request, Response, NextFunction } from "express";

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    (req as any).user = decoded;
    next();
  });
}

function verifyAdmin(req: Request, res: Response, next: NextFunction) {
  verifyToken(req, res, () => {
    if ((req as any).user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }
    next();
  });
}

function verifyUser(req: Request, res: Response, next: NextFunction) {
  verifyToken(req, res, () => {
    if ((req as any).user.role !== "user") {
      return res.status(403).json({ message: "User access only" });
    }
    next();
  });
}

module.exports = { verifyToken, verifyAdmin, verifyUser };
