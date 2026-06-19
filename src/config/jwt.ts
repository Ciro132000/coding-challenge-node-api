import jwt from 'jsonwebtoken';
import { env } from './env.js';

export class JwtAdapter {

    static async generateToken(payload: Object, duration: number = 1800) : Promise<string | null> {
        return new Promise((resolve) => {
            jwt.sign(payload, env.SEED_JWT, { expiresIn: duration }, (err, token) => {
                if(err) return resolve(null);

                resolve(token!);
            })
        });
    }

    static validateToken(token: string) : Promise<string | jwt.JwtPayload | undefined | null> {
        return new Promise((resolve) => {
            jwt.verify(token, env.SEED_JWT, (err, decoded) => {
                if(err) return resolve(null);
                resolve(decoded)
            })
        })
    }
}