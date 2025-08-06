import e from 'express';
import express, { Request, Response} from 'express';


class UserController {
    public create(req: Request, res: Response) {
        const newUser = req.body;
        let user = `email: ${newUser.email}, password: ${newUser.password}`;
        res.send(`Create a new user with data: ${user}`);
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