import e from 'express';
import express, { Request, Response} from 'express';
import { UserDocument } from './../models/user.model';
import { UserInput } from './../interfaces/user.interface';
import { userService } from '../services/user.services';


class UserController {
    public async create(req: Request, res: Response) {
        try{
        const newUser : UserDocument = await userService.create(req.body as UserInput);
         res.status(201).json(newUser);

        }catch (error) {
            if (error instanceof ReferenceError) {
                res.status(400).json({ message: "User already exits" });
                return;
            }
            res.status(500).json(error);
        }

    }

    public getAll(req: Request, res: Response) {
        res.send('Get all users');
    }

    public getById(req: Request, res: Response) {
        const userId = req.params.id;
        res.send(`Get user with ID: ${userId}`);
    }

    public update(req: Request, res: Response) {
        const userId = req.params.id;
        res.send(`Update user with ID: ${userId}`);
    }

    public delete(req: Request, res: Response) {
        const userId = req.params.id;
        res.send(`Delete user with ID: ${userId}`);
    }


}

export const userController = new UserController();