import { Router } from 'express';
import {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
} from '../../controllers/userController.js';
import {
    addFriend,
    removeFriend
} from '../../controllers/friendController.js';

const router = Router();

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

export { router as userRouter };