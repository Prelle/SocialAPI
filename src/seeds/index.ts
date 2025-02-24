import db from '../config/connection.js';

try {
    await db();

    // TODO: Add seed data here

    console.info('Database seeded successfully');
    process.exit(0);
} catch (err) {
    console.error(`Error seeding database: ${err}`);
    process.exit(1);
}