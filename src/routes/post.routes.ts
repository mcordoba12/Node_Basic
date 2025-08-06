import express, { Request, Response} from 'express';

export const router = express.Router();

router.get('/',(req : Request, res :Response) => {
    res.send('Get all users');
});

router.get('/:id', (req: Request, res: Response) => {
    const userId = req.params.id;
    res.send(`Get user with ID: ${userId}`);
});

router.put('/:id', (req: Request, res: Response) => {
    const userId = req.params.id;
    res.send(`Update user with ID: ${userId}`);
});

router.delete('/:id', (req: Request, res: Response) => {
    const userId = req.params.id;
    res.send(`Delete user with ID: ${userId}`);
});

router.post('/', (req: Request, res: Response) => {
    const newUser = req.body;
    //console.dir(newUser);
    let user = `email: ${newUser.email}, password: ${newUser.password}`;
    //res.send(`Create a new user with data: ${JSON.stringify(newUser)}`);
    res.send(`Create a new user with data: ${user}`);
});