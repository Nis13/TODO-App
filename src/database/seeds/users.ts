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
          id:1,
            name: "admin",
            email: "admin@gmail.com",
            // password: "Admin@123"
            password:"$2b$10$ekdLwmpa2aSjmDRrekFixePa34VkK/9qHvvcjWKMl4e.U/BKkDsFC",
  },
      
    ]);
  })
}