import { Router } from 'express';
import validateToken from '../middlewares/tokenValidation';
import MatchesController from '../controllers/MatchesController';

const router = Router();

router.get('/', MatchesController.getAll);

router.patch('/:id/finish', validateToken, MatchesController.finishMatch);

router.patch('/:id', validateToken, MatchesController.updateMatch);
export default router;
