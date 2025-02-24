import { Router } from 'express';
import {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought
} from '../../controllers/thoughtController.js';
import {
    addReaction,
    deleteReaction
} from '../../controllers/reactionController.js';

const router = Router();

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

export { router as thoughtRouter };