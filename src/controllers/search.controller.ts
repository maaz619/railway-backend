import { NextFunction, Request, Response } from "express";
import Stop from "../models/trainStops.model";
import AppError from "../utils/app-error";
import Train from "../models/train.model";


const searchBetweenStations = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { fromStation, toStation } = req.query
        const from = await Stop.find({ station: fromStation }).populate(
            {
                path: 'train',
                populate: {
                    path: 'stations.station',
                    model: 'station'
                }
            }
        )
        const to = await Stop.find({ station: toStation }).populate('train')

        if (!from || !to) return next(new AppError('Invalid station', 400))

        // const trains = from.map(el => { return el.train['_id'].toString() })
        // const trains1 = to.map(el => { return el.train['_id'].toString() })
        // const intersection = trains.filter(train => trains1.includes(train))
        // console.log(intersection)
        // if (intersection.length < 1) return next(new AppError('No trains found', 404))

        // const allTrains = await Train.find({ '_id': { $in: intersection } }).populate('stations')

        res.status(200).send(from)
    } catch (error) {
        next(new AppError(error, res.statusCode))
    }
}

export { searchBetweenStations }