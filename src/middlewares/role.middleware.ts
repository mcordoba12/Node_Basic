import { Request, Response, NextFunction } from "express";

export const authorize = (allowed: string[]) => {
  // Normaliza los roles permitidos una sola vez
  const allowedNorm = allowed.map(r => String(r).trim().toLowerCase());

  return (req: Request, res: Response, next: NextFunction) => {
    const u: any = (req as any).user;

    if (!u) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    // Soporta role: "user" o roles: ["user", "admin"]
    const rawRoles: string[] = Array.isArray(u.roles)
      ? u.roles
      : (u.role ? [u.role] : []);

    const userRolesNorm = rawRoles.map(r => String(r).trim().toLowerCase());

    const ok = userRolesNorm.some(r => allowedNorm.includes(r));

    if (!ok) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }

    next();
  };
};
