import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const router = Router();

router.get('/home', LeaderboardController.getHomeLeaderboard);

router.get('/away', LeaderboardController.getAwayLeaderboard);

export default router;
