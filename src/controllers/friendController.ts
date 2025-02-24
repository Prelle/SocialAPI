import { Request, Response } from 'express';
import { User } from '../models/index.js';

// Add a new friend to a user's friend list
export const addFriend = async (req: Request, res: Response) => {
    const { userId, friendId } = req.params;

    try {
        const friend = await User.findById(friendId);

        if (!friend) {
            res.status(404).json({ message: 'Invalid friend ID' });
        } else {
            const user = await User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { friends: friendId } },
                { new: true }
            );

            if (!user) {
                res.status(404).json({ message: 'No user found with that ID' });
            } else {
                res.json(user);
            }
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

// Remove a friend from a user's friend list
export const removeFriend = async (req: Request, res: Response) => {
    const { userId, friendId } = req.params;

    try {
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { $removeFromSet: { friends: friendId } },
            { new: true }
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