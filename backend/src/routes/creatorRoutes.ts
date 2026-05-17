import express from 'express';
import { getCreator, updateCreator, getCreatorStats } from '../controllers/creatorController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/:id', getCreator);
router.put('/:id', authenticateToken, updateCreator);
router.get('/:id/stats', getCreatorStats);

export default router;
