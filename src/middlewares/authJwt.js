import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/User';
import Role from '../models/Roles';


export const verifyToken = async (req, res, next) => {
  try {
    // Obtener token del header (soporta 'x-access-token' y 'authorization')
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    
    // Verificar si no hay token
    if (!token) {
      return res.status(403).json({ message: "No hay token, autorización denegada" });
    }

    // Remover prefijo 'Bearer ' si está presente
    if (token.startsWith("Bearer ")) {
      token = token.slice(7).trim();
    }
    
    // Verificar token
    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: 'no user found' });
    if (user.active === false) return res.status(403).json({ message: 'Usuario deshabilitado o inactivo' });
    next();

  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export const isModerator = async (req, res, next) => {
  const user = await User.findById(req.userId)
  const roles = await Role.find({ _id: { $in: user.roles } })

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name == "moderator") {
      next();
      return;
    }
  }
  return res.status(403).json({ message: "Require Moderator role" })
};

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId)
  const roles = await Role.find({ _id: { $in: user.roles } })

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name == "admin") {
      next();
      return;
    }
  }
  return res.status(403).json({ message: "Require Admin role" })
}
