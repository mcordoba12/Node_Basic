import express, { Request, Response} from 'express';
import{ userController } from '../controllers/user.controller';
import { auth } from '../middlewares/auth.middleware';
import { validateSchema } from '../middlewares';
import { userSchema } from '../shemas';
export const router = express.Router();
import { authorize } from '../middlewares/role.middleware';


router.get("/", auth, authorize(["user"]), userController.getAll);
router.get('/profile',auth, userController.getById);
router.get('/:id', userController.getById);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);
router.post('/',validateSchema(userSchema),  userController.create);
router.post('/login', userController.login);
