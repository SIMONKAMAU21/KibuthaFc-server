import {Router} from 'express';
import { addNews, deleteNews, getAllNews, getNeswById, updateNews } from '../controllers/newsController.js';

const newsRouter =Router();

newsRouter.post('/news/add', addNews);
newsRouter.delete('/news/:id',deleteNews);
newsRouter.get('/news',getAllNews);
newsRouter.get('/news/:id',getNeswById);
newsRouter.put('/news/:id',updateNews);



export default newsRouter;