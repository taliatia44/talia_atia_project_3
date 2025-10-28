import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

interface AuthRequest extends Request {
  user?: any
}

function verifyToken(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers["authorization"]
  if (!authHeader) {
    res.status(401).json({ message: "No token provided" })
    return;
  }

  const token = authHeader.split(" ")[1]
  if (!token) {
    res.status(401).json({ message: "No token provided" })
    return
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: "Invalid token" })
      return
    }

    req.user = decoded
    next()
  })
}

function verifyUser(req: AuthRequest, res: Response, next: NextFunction): void {
  verifyToken(req, res, () => {
    if (!req.user || (req.user.role !== "user" && req.user.role !== "admin")) {
      res.status(403).json({ message: "User access only" })
      return
    }
    next()
  })
}

function verifyAdmin(req: AuthRequest, res: Response, next: NextFunction): void {
  verifyToken(req, res, () => {
    if (!req.user || req.user.role !== "admin") {
      res.status(403).json({ message: "Admin access only" })
      return
    }
    next()
  })
}

export { verifyToken, verifyUser, verifyAdmin }
