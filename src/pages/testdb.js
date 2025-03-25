import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getServerSideProps() {
    const logs = [];

    const log = (message) => {
        logs.push(`${new Date().toISOString()} - ${message}`);
    };

    try {
        log('Attempting to connect to database...');
        await prisma.$connect();
        log('Database connected successfully');

        log('Creating a Mission record...');
        const created = await prisma.mission.create({
            data: {
                image: 'test-image.jpg',
                text: 'Test mission text',
            },
        });
        log(`Created Mission: ${JSON.stringify(created)}`);

        log('Fetching all Mission records...');
        const allMissions = await prisma.mission.findMany();
        log(`Found Missions: ${JSON.stringify(allMissions)}`);

        log(`Updating Mission with id ${created.id}...`);
        const updated = await prisma.mission.update({
            where: { id: created.id },
            data: { text: 'Updated mission text' },
        });
        log(`Updated Mission: ${JSON.stringify(updated)}`);

        log(`Deleting Mission with id ${created.id}...`);
        const deleted = await prisma.mission.delete({
            where: { id: created.id },
        });
        log(`Deleted Mission: ${JSON.stringify(deleted)}`);
    } catch (error) {
        log(`Error: ${error.message}`);
    } finally {
        await prisma.$disconnect();
        log('Database disconnected');
    }

    return {
        props: {
            logs,
        },
    };
}

export default function TestDB({ logs }) {
    return (
        <div>
            <h1>Database Test Page (Mission Table)</h1>
            <h2>Logs:</h2>
            <pre>{logs.join('\n')}</pre>
        </div>
    );
}