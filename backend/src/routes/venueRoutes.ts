import express from 'express';
import { getVenue, createVenue, updateVenue } from '../controllers/venueController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/:id', getVenue);
router.post('/', authenticateToken, createVenue);
router.put('/:id', authenticateToken, updateVenue);

export default router;
