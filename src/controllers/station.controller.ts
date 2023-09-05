import { NextFunction, Request, Response } from "express";
import Station from "../models/station.model";
import AppError from "../utils/app-error";
import Train from "../models/train.model";
import Stop from "../models/trainStops.model";

const craeteStation = async (
    req: Request,
    res: Response,
    next: NextFunction

) => {
    try {
        const station = new Station({ ...req.body })
        const result = await station.save()
        res.status(201).send(result)
    } catch (error) {
        next(new AppError(error, 400))
    }
}

const getAllStation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const station = await Station.find({}).populate('trains')
        if (!station) return new AppError("no stations found", 404)
        res.status(200).send(station)
    } catch (error) {
        next(new AppError(error, 400))
    }
}

const updateStation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const station = await Station.findByIdAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true })
        if (!station) return new AppError("no stations found", 404)
        return res.status(201).send(station)
    } catch (error) {
        next(new AppError(error, res.statusCode))
    }
}

const addTrainToStation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const station = req.params.id
        const map = new Stop({ station: station, ...req.body })
        await map.save()
        await Station.findByIdAndUpdate(station, { $push: { trains: map._id } })
        await Train.findByIdAndUpdate(req.body.train, { $push: { stations: map._id } })
        res.status(201).send(map)
    } catch (error) {
        next(new AppError(error, res.statusCode))
    }
}
export { craeteStation, getAllStation, updateStation, addTrainToStation }