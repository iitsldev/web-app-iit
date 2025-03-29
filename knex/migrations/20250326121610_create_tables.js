/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable('Mission', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('text').notNullable();
    });

    await knex.schema.createTable('Card', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('image').notNullable();
        table.string('description').notNullable();
        table.string('link').notNullable();
        table.string('color').notNullable();
        table.string('titleColor').notNullable();
        table.string('arrowColor').notNullable();
    });

    await knex.schema.createTable('NavigationItem', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('htmlId').notNullable();
        table.string('category').notNullable();
    });

    await knex.schema.createTable('DhammaLecture', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('body').notNullable();
        table.string('image').notNullable();
        table.string('link').notNullable();
    });

    await knex.schema.createTable('FAQ', table => {
        table.increments('id').primary();
        table.string('question').notNullable();
        table.string('answer').notNullable();
    });

    await knex.schema.createTable('Meditation', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('body').notNullable();
        table.string('link').notNullable();
        table.string('image').notNullable();
    });

    await knex.schema.createTable('NewsAndEvent', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('type').notNullable();
        table.datetime('date').notNullable();
        table.string('description').notNullable();
        table.string('image').nullable();
    });

    await knex.schema.createTable('OurFocus', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('body').notNullable();
        table.string('image').notNullable();
        table.string('link').notNullable();
    });

    await knex.schema.createTable('Testimonial', table => {
        table.increments('id').primary();
        table.string('quote').notNullable();
        table.string('author').notNullable();
        table.string('image').notNullable();
        table.string('description').notNullable();
        table.string('video').notNullable();
    });

    await knex.schema.createTable('AcademicProfile', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('title').notNullable();
        table.string('body').notNullable();
        table.string('body2').nullable();
        table.string('profileImage').notNullable();
        table.datetime('createdAt').defaultTo(knex.fn.now());
        table.datetime('updatedAt').defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('User', table => {
        table.increments('id').primary();
        table.string('username').notNullable().unique();
        table.string('password').notNullable();
        table.datetime('createdAt').defaultTo(knex.fn.now());
        table.datetime('updatedAt').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.dropTable('User');
    await knex.schema.dropTable('AcademicProfile');
    await knex.schema.dropTable('Testimonial');
    await knex.schema.dropTable('OurFocus');
    await knex.schema.dropTable('NewsAndEvent');
    await knex.schema.dropTable('Meditation');
    await knex.schema.dropTable('FAQ');
    await knex.schema.dropTable('DhammaLecture');
    await knex.schema.dropTable('NavigationItem');
    await knex.schema.dropTable('Card');
    await knex.schema.dropTable('Mission');
};