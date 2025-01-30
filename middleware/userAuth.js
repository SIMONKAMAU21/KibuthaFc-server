import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import { notAuthorized } from "../helper/helper.function.js";
dotenv.config()

export const auth = (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], "secret", (err, decode) =>  {
            if (err) {
                
                return notAuthorized(res, 'Please login or create an account ');
            } else {
                req.user = decode;
                next();
            }
        });
    } else {
        return notAuthorized(res, 'Access denied');
    }

} 