import { Knex } from 'knex';

const TABLE_NAME = 'permissions';

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
          permission: "get.users",
        },
        {
          id:2,
          permission:'get.usersById',
        },
        {
          id:3,
          permission:"post.createUser"
        },
        {
          id:4,
          permission:'put.updateUser'
        },
        {
          id:5,
          permission:'delete.deleteUser'
        },
        {
          id:6,
          permission:'get.allTasks'
        },
        {
          id:7,
          permission:'get.taskByQuery'
        },

        {
          id:8,
          permission:'get.taskByID'
        },
        {
          id:9,
          permission:"get.tasks",
        },
        {
          id:10,
          permission:"post.tasks"
        },
        {
          id:11,
          permission:'post.createTask',
        },{
          id:12,
          permission:'put.updateTask',
        },
        {
          id:13,
          permission:'delete.deleteTask',
        },
      ]);
    });
}