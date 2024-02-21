import { NextFunction,Request,Response } from 'express';
import admin from '../config/firebase.config';
export const decodedToken=	async (req:Request, res:Response, next:NextFunction) =>{
        const token = req.headers.authorization?.split(" ")[1] || "";
		try {
			const decodeValue = await admin.auth().verifyIdToken(token);
			if (decodeValue) {
				req.user = decodeValue;
				return next();
			}
			return res.json({ message: 'Un authorize' });
		} catch (e) {
			return res.json({ message: 'Internal Error' });
		}
	}


