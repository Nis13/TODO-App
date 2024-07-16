import { Knex } from 'knex';

const TABLE_NAME = 'tasks';

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          title: "task 1",
          completed: false,
          userId:1,
        },
        {
          title: "task 2",
          completed: false,
          userId:2,
        },
        {
          title: "task 3",
          completed: false,
          userId:2,
        },
      ]);
    });
}