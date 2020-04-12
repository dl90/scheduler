
exports.seed = function (knex) {
  return knex('users').del()
    .then( function () {

      return knex('users').insert([
        { username: "test1", password: '$2b$10$Zp/3lYeGmGI9i7KXf6DBQubS6Y.mxMAp//lzIO/BNnIhGkjC6zdBm', email: "test1@test.com" },
        { username: "test2", password: '$2b$10$Zp/3lYeGmGI9i7KXf6DBQubS6Y.mxMAp//lzIO/BNnIhGkjC6zdBm', email: "test2@test.com" },
        { username: "test3", password: '$2b$10$Zp/3lYeGmGI9i7KXf6DBQubS6Y.mxMAp//lzIO/BNnIhGkjC6zdBm', email: "test3@test.com" }
      ]);
    })
};
