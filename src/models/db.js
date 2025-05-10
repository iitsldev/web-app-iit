// db.js
const knexConfig = require('../../knex/knexfile');
const knex = require('knex')(knexConfig.development);

async function getMissions() {
    try {
        return await knex('Mission').select();
    } catch (error) {
        const { logError } = await import('./logger');
        await logError('Error fetching missions', error);
        throw error;
    }
}

async function getCards() {
    try {
        return await knex('Card').select();
    } catch (error) {
        const { logError } = await import('./logger');
        await logError('Error fetching cards', error);
        throw error;
    }
}

async function getCardById(id) {
    try {
        const card = await knex('Card')
            .where({ id: parseInt(id) })
            .first();
        if (!card) {
            throw new Error('Card not found');
        }
        return card;
    } catch (error) {
        const { logError } = await import('./logger'); // Adjust path if logger is elsewhere
        await logError('Error fetching card by ID', error);
        throw error;
    }
}

async function updateCard(id, data) {
    try {
        await knex('Card')
            .where({ id: parseInt(id) })
            .update(data);
        return await getCardById(id); // Return the updated card
    } catch (error) {
        const { logError } = await import('./logger');
        await logError('Error updating card', error);
        throw error;
    }
}
async function createCard(data) {
    try {
        const [id] = await knex('Card').insert(data);
        return { id, ...data }; // Return the new card with its generated ID
    } catch (error) {
        const { logError } = await import('./logger');
        await logError('Error creating card', error);
        throw error;
    }
}

async function deleteCard(id) {
    try {
        const deletedCount = await knex('Card')
            .where({ id: parseInt(id) })
            .del();
        if (deletedCount === 0) {
            throw new Error('Card not found');
        }
        return { message: 'Card deleted' };
    } catch (error) {
        const { logError } = await import('./logger');
        await logError('Error deleting card', error);
        throw error;
    }
}

async function getAboutUsList() {
    try {
        const items = await knex('NavigationItem')
            .select('title', 'htmlId')
            .where({ category: 'aboutUs' });
        return items.map(item => ({ title: item.title, id: item.htmlId }));
    } catch (error) {
        const { logError } = await import('./logger');
        await logError('Error fetching aboutUs list', error);
        throw error;
    }
}

async function getInstituteList() {
    try {
        const items = await knex('NavigationItem')
            .select('title', 'htmlId')
            .where({ category: 'institute' });
        return items.map(item => ({ title: item.title, id: item.htmlId }));
    } catch (error) {
        const { logError } = await import('./logger');
        await logError('Error fetching institute list', error);
        throw error;
    }
}

async function getEduList() {
    try {
        const items = await knex('NavigationItem')
            .select('title', 'htmlId')
            .where({ category: 'edu' });
        return items.map(item => ({ title: item.title, id: item.htmlId }));
    } catch (error) {
        const { logError } = await import('./logger');
        await logError('Error fetching edu list', error);
        throw error;
    }
}

async function getDhammaLectures() {
    try {
        return await knex('DhammaLecture').select();
    } catch (error) {
        const { logError } = await import('./logger');
        await logError('Error fetching dhamma lectures', error);
        throw error;
    }
}

async function getFAQs() {
    try {
        return await knex('FAQ').select();
    } catch (error) {
        const { logError } = await import('./logger');
        await logError('Error fetching FAQs', error);
        throw error;
    }
}

async function getMeditations() {
    try {
        return await knex('Meditation').select();
    } catch (error) {
        const { logError } = await import('./logger');
        await logError('Error fetching meditations', error);
        throw error;
    }
}

async function getOurFocus() {
    try {
        return await knex('OurFocus').select();
    } catch (error) {
        const { logError } = await import('./logger');
        await logError('Error fetching our focus', error);
        throw error;
    }
}

async function getTestimonials() {
    try {
        return await knex('Testimonial').select();
    } catch (error) {
        const { logError } = await import('./logger');
        await logError('Error fetching testimonials', error);
        throw error;
    }
}

async function getAcademicProfiles() {
    try {
        return await knex('AcademicProfile').select();
    } catch (error) {
        const { logError } = await import('./logger');
        await logError('Error fetching academic profiles', error);
        throw error;
    }
}

async function getUserByUsername(username) {
    try {
        return await knex('User')
            .where({ username })
            .first();
    } catch (error) {
        const { logError } = await import('./logger');
        await logError('Error fetching user', error);
        throw error;
    }
}

async function getUserById(id) {
    try {
        const user = await knex('User')
            .where({ id: parseInt(id) })
            .first();
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        const { logError } = await import('./logger'); // Adjust path if needed
        await logError('Error fetching user by ID', error);
        throw error;
    }
}

async function updateUser(id, data) {
    try {
        const updatedCount = await knex('User')
            .where({ id: parseInt(id) })
            .update(data);
        if (updatedCount === 0) {
            throw new Error('User not found');
        }
        return await getUserById(id); // Return the updated user
    } catch (error) {
        const { logError } = await import('./logger');
        await logError('Error updating user', error);
        throw error;
    }
}
// CRUD Operations
async function createItem(model, data) {
    try {
        if (model === 'NewsAndEvent' && data.date) {
            data.date = new Date(data.date);
        }
        const [id] = await knex(model).insert(data);
        return { id, ...data };
    } catch (error) {
        const { logError } = await import('./logger');
        await logError(`Error creating ${model}`, error);
        throw error;
    }
}

async function getItems(model, options = {}) {
    try {
        let query = knex(model);
        if (options.where) query = query.where(options.where);
        if (options.orderBy) query = query.orderBy(options.orderBy);
        if (options.take) query = query.limit(options.take);
        return await query;
    } catch (error) {
        const { logError } = await import('./logger');
        await logError(`Error fetching ${model}`, error);
        throw error;
    }
}

async function updateItem(model, id, data) {
    try {
        if (model === 'NewsAndEvent' && data.date) {
            data.date = new Date(data.date);
        }
        await knex(model)
            .where({ id: parseInt(id) })
            .update(data);
        return await getItemById(model, id);
    } catch (error) {
        const { logError } = await import('./logger');
        await logError(`Error updating ${model}`, error);
        throw error;
    }
}

async function getItemById(model, id) {
    try {
        const item = await knex(model)
            .where({ id: parseInt(id) })
            .first();
        if (!item) throw new Error(`${model} not found`);
        return item;
    } catch (error) {
        const { logError } = await import('./logger');
        await logError(`Error fetching ${model} by ID`, error);
        throw error;
    }
}

async function deleteItem(model, id) {
    try {
        await knex(model)
            .where({ id: parseInt(id) })
            .del();
        return { id: parseInt(id) };
    } catch (error) {
        const { logError } = await import('./logger');
        await logError(`Error deleting ${model}`, error);
        throw error;
    }
}

async function getNewsAndEvents({ id, type, limit } = {}) {
    try {
        if (id) {
            return await getItemById('NewsAndEvent', id);
        }
        let query = knex('NewsAndEvent');
        if (type) query = query.where({ type });
        query = query.orderBy('date', 'desc');
        if (limit) query = query.limit(parseInt(limit));
        return await query;
    } catch (error) {
        const { logError } = await import('./logger');
        await logError('Error fetching news and events', error);
        throw error;
    }
}

async function getAllImages() {
    try {
        const modelsWithImages = [
            'Mission', 'Card', 'DhammaLecture', 'Meditation',
            'NewsAndEvent', 'OurFocus', 'Testimonial'
        ];

        const imagePromises = modelsWithImages.map((model) =>
            knex(model)
                .select('image')
                .whereNot('image', '') // Knex syntax for "not empty"
        );

        const imageResults = await Promise.all(imagePromises);
        return imageResults
            .flat()
            .map((item) => item.image)
            .filter(Boolean);
    } catch (error) {
        const { logError } = await import('./logger'); // Adjust path if needed
        await logError('Error fetching all images', error);
        throw error;
    }
}

module.exports = {
    knex, // Export knex instance if needed elsewhere
    getMissions,
    getCards,
    getCardById,
    updateCard,
    createCard,
    deleteCard,
    getAboutUsList,
    getInstituteList,
    getEduList,
    getDhammaLectures,
    getFAQs,
    getMeditations,
    getOurFocus,
    getTestimonials,
    getAcademicProfiles,
    getUserByUsername,
    getUserById,
    updateUser,
    createItem,
    getItems,
    updateItem,
    getItemById,
    deleteItem,
    getNewsAndEvents,
    getAllImages,
};