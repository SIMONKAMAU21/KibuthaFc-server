import { Router } from 'express';
import { addUser, deleteUser, getAllUsers, getUserById, login, updateUser } from '../controllers/userController.js';
import { upload } from '../middleware/multer.js';

const userRouter = Router();

userRouter.post('/users/add',addUser);
userRouter.post('/users/login', login);
userRouter.delete('/users/:id', deleteUser);
userRouter.get('/users', getAllUsers);
userRouter.get('/users/:id', getUserById);
userRouter.put('/user/:id',upload.single('photo'), updateUser)



export default userRouter;