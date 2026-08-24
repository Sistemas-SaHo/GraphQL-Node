import jwt from 'jsonwebtoken';
import { Request } from 'express';

export interface JwtPayload {
    id_usuario: number;
    nombre_completo: string;
    id_empleado: number;
    sexo: string;
    matricula: string;
    puesto: string;
}

export const authJwt = (req: Request): JwtPayload | null => {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new Error('Token requerido');
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) throw new Error('Formato de token inválido');

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error('JWT_SECRET no definido');
        const user = jwt.verify(token, secret) as JwtPayload;
        return user;
    } catch {
        throw new Error('Token inválido o expirado');
    }
};