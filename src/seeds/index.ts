import db from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import cleanDB from './cleanDB.js';
import { users, getRandomThought, getRandomReaction, getRandomUsername } from './data.js';

try {
    await db();
    await cleanDB();

    console.log("Seeding Users...");

    for (let user of users) {
        const newUser = await User.create(user);

        const thoughtCount = Math.floor(Math.random() * 3);

        for (let i = 0; i < thoughtCount; i++) {
            const thought = await Thought.create({
                thoughtText: getRandomThought(),
                username: user.username
            });

            const reactionCount = Math.floor(Math.random() * 4);

            for (let j = 0; j < reactionCount; j++) {
                await Thought.findOneAndUpdate(
                    { _id: thought._id },
                    {
                        $push: {
                            reactions:
                            {
                                reactionBody: getRandomReaction(),
                                username: getRandomUsername()
                            }
                        }
                    }
                )
            }

            await User.findOneAndUpdate(
                { _id: newUser._id },
                { $push: { thoughts: thought._id } }
            );
        }
    }

    console.log("Seeding Friends...");

    const userData = await User.find();

    for (let i = 0; i < userData.length; i++) {
        const friendCount = Math.floor(Math.random() * 3);
        const friends = userData
            .filter((friend) => friend._id !== userData[i]._id)
            .map((friend) => friend._id)
            .sort(() => 0.5 - Math.random())
            .slice(0, friendCount);

        await User.findOneAndUpdate(
            { _id: userData[i]._id },
            { $addToSet: { friends: friends } }
        );
    }

    console.info('Database seeded successfully');
    process.exit(0);
} catch (err) {
    console.error(`Error seeding database: ${err}`);
    process.exit(1);
}