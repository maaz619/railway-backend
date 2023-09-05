import jwt from "jsonwebtoken"
import { IUser } from "../models/user.model"

export interface IToken {
    id: string
}

const createToken = (user: IUser): string => {
    return jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET as jwt.Secret,
        {
            expiresIn: process.env.EXPIRES_IN
        }
    )
}
const verifyToken = async (token: string): Promise<jwt.VerifyErrors | IToken> => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            process.env.JWT_SECRET as jwt.Secret,
            (err: any, payload: any) => {
                if (err) return reject(err)
                resolve(payload as IToken)
            }

        )
    })
}

export { createToken, verifyToken }