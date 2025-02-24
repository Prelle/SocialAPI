import { Request, Response } from 'express';
import { User } from '../models/index.js';

// Return all users
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Return a single user _id with populated thought and friend data
export const getSingleUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId)
            .populate('thoughts').populate('friends');

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'No user found with that ID' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// Create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

// Update a user based on _id
export const updateUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!user) {
            res.status(404).json({ message: 'No user found with that ID' });
        } else {
            res.json(user);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// Remove user by _id
export const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const result = await User.findOneAndDelete({ _id: userId });

        if (!result) {
            res.status(404).json({ message: 'No user found with that ID' });
        } else {
            res.status(200).json(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}