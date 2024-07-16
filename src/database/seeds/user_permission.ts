import { Knex } from 'knex';

const TABLE_NAME = 'user_permission';

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
          user_id: 1,
          permission_id: 5,
        },
        {
          user_id:1,
          permission_id:6
        },
        {
          user_id:2,
          permission_id:5
        },
        {
          user_id:2,
          permission_id:7
        }
      ]);
    });
}