import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getMissions() {
  try {
    const missions = await prisma.mission.findMany();
    return missions;
  } catch (error) {
    console.error('Error fetching missions:', error);
    throw error;
  }
}

export async function getCards() {
  try {
    const cards = await prisma.card.findMany();
    return cards;
  } catch (error) {
    console.error('Error fetching cards:', error);
    throw error;
  }
}

export async function getAboutUsList() {
  try {
    const items = await prisma.navigationItem.findMany({
      where: { category: 'aboutUs' },
    });
    return items.map(item => ({ title: item.title, id: item.htmlId }));
  } catch (error) {
    console.error('Error fetching aboutUs list:', error);
    throw error;
  }
}

export async function getInstituteList() {
  try {
    const items = await prisma.navigationItem.findMany({
      where: { category: 'institute' },
    });
    return items.map(item => ({ title: item.title, id: item.htmlId }));
  } catch (error) {
    console.error('Error fetching institute list:', error);
    throw error;
  }
}

export async function getEduList() {
  try {
    const items = await prisma.navigationItem.findMany({
      where: { category: 'edu' },
    });
    return items.map(item => ({ title: item.title, id: item.htmlId }));
  } catch (error) {
    console.error('Error fetching edu list:', error);
    throw error;
  }
}

export async function getDhammaLectures() {
  try {
    const lectures = await prisma.dhammaLecture.findMany();
    return lectures;
  } catch (error) {
    console.error('Error fetching dhamma lectures:', error);
    throw error;
  }
}

export async function getFAQs() {
  try {
    const faqs = await prisma.FAQ.findMany();
    return faqs;
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    throw error;
  }
}

export async function getMeditations() {
  try {
    const meditations = await prisma.meditation.findMany();
    return meditations;
  } catch (error) {
    console.error('Error fetching meditations:', error);
    throw error;
  }
}


export async function getOurFocus() {
  try {
    const ourFocus = await prisma.ourFocus.findMany();
    return ourFocus;
  } catch (error) {
    console.error('Error fetching our focus:', error);
    throw error;
  }
}

export async function getTestimonials() {
  try {
    const testimonials = await prisma.testimonial.findMany();
    return testimonials;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    throw error;
  }
}

export async function getAcademicProfiles() {
  try {
    const profiles = await prisma.academicProfile.findMany();
    return profiles;
  } catch (error) {
    console.error('Error fetching academic profiles:', error);
    throw error;
  }
}

export async function getUserByUsername(username) {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

//CRUID for all tables.
export async function createItem(model, data) {
  try {
    if (model === 'newsAndEvent') {
      data.date = new Date(data.date); // Convert string to Date object
    }
    return await prisma[model].create({ data });
  } catch (error) {
    console.error(`Error creating ${model}:`, error);
    throw error;
  }
}

export async function getItems(model, options = {}) {
  try {
    return await prisma[model].findMany(options);
  } catch (error) {
    console.error(`Error fetching ${model}:`, error);
    throw error;
  }
}

export async function updateItem(model, id, data) {
  try {
    if (model === 'newsAndEvent') {
      data.date = new Date(data.date); // Convert string to Date object
    }
    return await prisma[model].update({
      where: { id: parseInt(id) },
      data,
    });
  } catch (error) {
    console.error(`Error updating ${model}:`, error);
    throw error;
  }
}

export async function getItemById(model, id) {
  try {
    const item = await prisma[model].findUnique({
      where: { id: parseInt(id) },
    });
    if (!item) throw new Error(`${model} not found`);
    return item;
  } catch (error) {
    console.error(`Error fetching ${model} by ID:`, error);
    throw error;
  }
}

export async function deleteItem(model, id) {
  try {
    return await prisma[model].delete({
      where: { id: parseInt(id) },
    });
  } catch (error) {
    console.error(`Error deleting ${model}:`, error);
    throw error;
  }
}

export async function getNewsAndEvents({ id, type, limit } = {}) {
  try {
    if (id) {
      return await getItemById('newsAndEvent', id);
    }

    const filters = {};
    if (type) filters.type = type;

    return await getItems('newsAndEvent', {
      where: filters,
      orderBy: { date: 'desc' }, // Changed from dateStr
      take: limit ? parseInt(limit) : undefined,
    });
  } catch (error) {
    console.error('Error fetching news and events:', error);
    throw error;
  }
}

export { prisma };