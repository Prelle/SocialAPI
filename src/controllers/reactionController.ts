import { Request, Response } from 'express';
import { Thought } from '../models/index.js';

// Add a new reaction to an existing thought
export const addReaction = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;

    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            res.status(404).json({ message: 'No thought found with that ID' });
        } else {
            res.json(thought);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// Remove a reaction from an existing thought
export const deleteReaction = async (req: Request, res: Response) => {
    const { thoughtId, reactionId } = req.params;

    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $pull: { reactions: { reactionId } } },
            { new: true }
        );

        if (!thought) {
            res.status(404).json({ message: 'No thought found with that ID' });
        } else {
            res.json(thought);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}