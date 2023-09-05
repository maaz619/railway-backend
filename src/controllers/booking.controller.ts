import { Request, Response, NextFunction } from "express";
import Ticket from "../models/ticket.model";
import { IToken } from "../utils/auth";
import AppError from "../utils/app-error";
import User from "../models/user.model";

const bookTicket = async (
    req: Request & { user: IToken },
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user.id;
        const ticketDetails = {
            ...req.body,
            passanger: userId
        }
        const ticket = new Ticket(ticketDetails);
        const result = await ticket.save();
        await User.findByIdAndUpdate(userId, { $push: { booked_tickets: ticket._id } })
        res.status(201).send(result)
    } catch (error) {
        next(new AppError(error.mmessage, 500))
    }
}

const getAllTickets = async (
    req: Request & { user: IToken },
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user.id
        const tickets = await Ticket.find({ passanger: userId }).populate({
            path: 'passanger train',
            select: '-booked_tickets -__v -password -_id -createdAt -updatedAt'
        })
        res.status(200).send(tickets)
    } catch (error) {
        next(new AppError(error.message, 400))
    }
}

const cancelTicket = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

}

export { bookTicket, cancelTicket, getAllTickets }