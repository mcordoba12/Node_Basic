import express, { Request, Response} from 'express';
import{ userController } from '../controllers/user.controller';
export const router = express.Router();

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);
router.post('/', userController.create);
router.post('/login', userController.login);
