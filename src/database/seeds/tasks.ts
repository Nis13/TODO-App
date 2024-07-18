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
          id:1,
          title: "task 1 admin",
          completed: false,
          user_id:1,
        },
        {
          id:2,
          title: "task 2 admin",
          completed: false,
          user_id:1,
        },
        {
          id:3,
          title: "task 3 admin",
          completed: false,
          user_id:1,
        },
      ]);
    });
}