
exports.seed = function (knex) {
  let dataArr = [];

  // Deletes ALL existing entries
  return knex('contacts').del()
    .then(function () {
      return knex('users').select('id')
        .then(function (result) {
          result.forEach(function (value) {
            dataArr.push(value)
          });
        });
    })
    .then(function () {
      const max = dataArr.length

      // Inserts seed entries
      return knex('contacts').insert([
        { user_id: dataArr[0 < max ? 0 : max].id, first_name: "Sam", last_name: "M", email: "sam.m@mail.com" },
        { user_id: dataArr[0 < max ? 0 : max].id, first_name: "Sam", last_name: "e", email: "sam.e@mail.com" },
        { user_id: dataArr[0 < max ? 0 : max].id, first_name: "Sam", last_name: "e", email: "sam.e@mail.com" },
        { user_id: dataArr[1 < max ? 1 : max].id, first_name: "Sam", last_name: "c", email: "sam.c@mail.com" },
        { user_id: dataArr[1 < max ? 1 : max].id, first_name: "Sam", last_name: "h", email: "sam.h@mail.com" },
        { user_id: dataArr[1 < max ? 1 : max].id, first_name: "Sam", last_name: "w", email: "sam.w@mail.com" },
        { user_id: dataArr[2 < max ? 2 : max].id, first_name: "Sam", last_name: "a", email: "sam.a@mail.com" },
        { user_id: dataArr[2 < max ? 2 : max].id, first_name: "Sam", last_name: "r", email: "sam.r@mail.com" },
        { user_id: dataArr[2 < max ? 2 : max].id, first_name: "Sam", last_name: "d", email: "sam.d@mail.com" }
      ]);
    })
};
