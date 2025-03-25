import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client (this will only run on the server)
const prisma = new PrismaClient();

export async function getServerSideProps() {
    const logs = [];

    const log = (message) => {
        logs.push(`${new Date().toISOString()} - ${message}`);
    };

    try {
        // Test 1: Connect to DB
        log('Attempting to connect to database...');
        await prisma.$connect();
        log('Database connected successfully');

        // Test 2: Create
        log('Creating an FAQ record...');
        const created = await prisma.fAQ.create({
            data: {
                question: 'What is the meaning of life?',
                answer: 'To seek happiness and understanding.',
            },
        });
        log(`Created FAQ: ${JSON.stringify(created)}`);

        // Test 3: Read
        log('Fetching all FAQ records...');
        const allFAQs = await prisma.fAQ.findMany();
        log(`Found FAQs: ${JSON.stringify(allFAQs)}`);

        // Test 4: Update
        log(`Updating FAQ with id ${created.id}...`);
        const updated = await prisma.fAQ.update({
            where: { id: created.id },
            data: { answer: 'To pursue wisdom and compassion.' },
        });
        log(`Updated FAQ: ${JSON.stringify(updated)}`);

        // Test 5: Delete
        log(`Deleting FAQ with id ${created.id}...`);
        const deleted = await prisma.fAQ.delete({
            where: { id: created.id },
        });
        log(`Deleted FAQ: ${JSON.stringify(deleted)}`);

    } catch (error) {
        log(`Error: ${error.message}`);
    } finally {
        await prisma.$disconnect();
        log('Database disconnected');
    }

    // Pass logs to the page as props
    return {
        props: {
            logs,
        },
    };
}

export default function TestDB({ logs }) {
    return (
        <div>
            <h1>Database Test Page (FAQ Table)</h1>
            <h2>Logs:</h2>
            <pre>{logs.join('\n')}</pre>
        </div>
    );
}