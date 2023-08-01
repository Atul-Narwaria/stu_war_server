import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CheckAdminExistance } from '../model/admin/admin';

const secret_key:string = process.env.APP_KEY!;

export const validateToken =async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if(!token){
            return res.status(401).json({ message: 'Authentication required' });
        }
        try{
            const decode:any = jwt.verify(token,secret_key);
            req.userid = decode.userid
            next();
        }catch (error:any) {
          return  res.status(401).json({ message: 'Invalid token' });
          }
}

export const isAdmin =async (req: Request, res: Response, next: NextFunction) => {
    let id:string = req.userid;
    console.log(req.userid)
    if(!id){
       return res.status(401).json({ message: 'Invalid token' });
    }
        const check = await CheckAdminExistance(id)
        console.log(check)
        if(check == 0){
           return res.status(401).json({ message: 'Admin role required' });
        }
        next();
}
