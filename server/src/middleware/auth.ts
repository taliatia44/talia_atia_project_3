import type { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

interface AuthRequest extends Request {
  user?: any;
}

function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
}

function verifyUser(req: AuthRequest, res: Response, next: NextFunction) {
  verifyToken(req, res, () => {
    if (!req.user || (req.user.role !== "user" && req.user.role !== "admin")) {
      return res.status(403).json({ message: "User access only" });
    }
    next();
  });
}

function verifyAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  verifyToken(req, res, () => {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }
    next();
  });
}

module.exports = { verifyToken, verifyUser, verifyAdmin };
