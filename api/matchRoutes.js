import {Router} from 'express';
import { addMatch, deleteMatch, getAllmatch, getMatchById, updateMatch } from '../controllers/matchController.js';

const matchRouter =Router();

matchRouter.post('/match/add', addMatch);
matchRouter.delete('/match/:id',deleteMatch);
matchRouter.get('/match',getAllmatch);
matchRouter.get('/match/:id',getMatchById);
matchRouter.put('/match/:id',updateMatch);



export default matchRouter;