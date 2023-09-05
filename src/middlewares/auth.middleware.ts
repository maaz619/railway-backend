import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { IToken } from "../utils/auth";
import User, { IUser } from "../models/user.model";
import { promisify } from "util";

const protect = (
    req: Request & { user: jwt.JwtPayload },
    res: Response,
    next: NextFunction
) => {
    const bearer: string = req.headers.authorization
    if (!bearer) {
        res.status(401).send("unauthorized")
        return
    }

    const token = bearer.split(" ")[1]

    if (!token) {
        res.status(401).send("unauthorized")
        return
    }

    try {
        const user = jwt.verify(
            token,
            process.env.JWT_SECRET
        )
        req.user = user as IToken
        next()
    } catch (error) {
        console.error(error)
        res.status(401).json({ message: 'not valid token' })
        return
    }
}
export { protect }