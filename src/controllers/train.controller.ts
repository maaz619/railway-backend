import { Request, Response, NextFunction } from "express";
import Train from "../models/train.model";
import AppError from "../utils/app-error";

const createTrain = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const train = new Train({ ...req.body })
        const result = await train.save()
        res.status(201).send(result)
    } catch (error) {
        next(new AppError(error.message, 500));
    }
}

const getTrains = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const trains = await Train.find({}).populate({
            path: 'stations'
        });
        if (!trains) return next(new AppError("No trains found", 404))
        res.status(200).send(trains)
    } catch (error) {
        next(new AppError(error.message, 500));
    }
}

const updateTrain = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const train = await Train.findByIdAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true })
        if (!train) return new AppError("no train found", 404)
        return res.status(201).send(train)
    } catch (error) {
        next(new AppError(error, res.statusCode))
    }
}

export { createTrain, getTrains, updateTrain }