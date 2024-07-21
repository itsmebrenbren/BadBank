import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;
    };
  }
}

const jwtSecret = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    console.log('No token provided');
    return res.sendStatus(401);
  }

  jwt.verify(token, jwtSecret, (err: any, decodedToken: any) => {
    if (err) {
      console.log('Token verification failed:', err);
      return res.sendStatus(403);
    }

    if (decodedToken && decodedToken.user && decodedToken.user.id) {
      req.user = { id: decodedToken.user.id };
      console.log('Authenticated user:', req.user);
    } else {
      console.log('Decoded token does not have the expected structure:', decodedToken);
      return res.sendStatus(403);
    }

    next();
  });
};


