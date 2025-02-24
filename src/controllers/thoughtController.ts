import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js';

// Return all thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Return a single thought by _id
export const getSingleThought = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;

    try {
        const thought = await Thought.findById(thoughtId);
        if (thought) {
            res.json(thought);
        } else {
            res.status(404).json({ message: 'No thought found with that ID' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// Create a thought and assign it to a user
export const createThought = async (req: Request, res: Response) => {
    const { userId } = req.body.userId;

    try {
        if (await User.countDocuments({ _id: userId }) === 0) {
            res.status(404).json({ message: 'No user found with that ID' });
        } else {
            const thought = await Thought.create(req.body);
            await User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );

            res.json(thought);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// Update a thought by _id
export const updateThought = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;

    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $set: req.body },
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

// Delete a thought by _id
export const deleteThought = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;

    try {
        const result = await Thought.findOneAndDelete({ _id: thoughtId });

        // TODO: Test if we need to remove the thought from the user

        if (!result) {
            res.status(404).json({ message: 'No thought found with that ID' });
        } else {
            res.status(200).json(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}