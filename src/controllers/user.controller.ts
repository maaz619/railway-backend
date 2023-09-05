import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/user.model";
import { IToken, createToken } from "../utils/auth";
import AppError from "../utils/app-error";

const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = new User({
            ...req.body
        })
        const result = await user.save()
        res.status(201).send(result)
    } catch (error) {
        if (error.name === 'ValidationError') next({
            status: 400,
            message: error.message
        })
    }

}

const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body

        const user: IUser = await User.findOne({ email })

        if (!user) return next(new AppError("user not found", 401))

        const isValid = await user.isPasswordValid(password)

        if (!isValid) return next(new AppError("password is incorrect", 401))

        const token = createToken(user)

        return res.status(200).json({ token })

    } catch (error) {
        if (
            error.message === 'user not found' ||
            error.message === 'password is incorrect'
        ) {
            next(new AppError(error.message, 404))
        } else {
            next(new AppError(error.message, 500))
        }
    }

}

const me = async (
    req: Request & { user: IToken },
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await User.findById(req.user.id).populate({
            path: 'booked_tickets',
            select: '-__v -password -_id -createAt -updatedAt'
        }).select('-__v -password -_id -createdAt -updatedAt')
        res.status(200).send(user)
    } catch (error) {
        next(new AppError(error, 400))
    }
}

const deleteMe = async (
    req: Request & { user: IToken },
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user.id;
        const user = await User.findByIdAndRemove(userId)
        if (!user) return next(new AppError("user not found", 404));
        res.status(201).send(user)

    } catch (error) {

    }
}

export { register, login, me, deleteMe }