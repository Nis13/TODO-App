import { Knex } from 'knex';

const TABLE_NAME = 'users';

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
          name: "User Seed",
          email: "user@user.com",
          password: "test123",
        },
        {
          name: "User2",
          email: "user2@user2.com",
          password: "User@2",
        },
        {
          name: "User3",
          email: "user3@user3.com",
          password: "User@3",
        }
      ]);
    });
}