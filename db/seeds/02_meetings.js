
exports.seed = function (knex) {
  let dataArr = [];

  // Deletes ALL existing entries
  return knex('meetings').del()
    .then(function () {
      return knex('users').select('id')
        .then(function (result) {
          result.forEach(function (value) {
            dataArr.push(value)
          });
        });
    })
    .then(function () {
      // dataArr lengh = number of users
      const max = dataArr.length
      // console.log(4 < max ? 0 : max)

      const birthday = new Date('December 1, 2020 03:20:00'),
        deathday = new Date('December 8, 2021 03:20:00');

      // Inserts seed entries
      return knex('meetings').insert([
        { user_id: dataArr[0 < max ? 0 : max].id, start_time: birthday, end_time: deathday, detail: "TODO 123" },
        { user_id: dataArr[0 < max ? 0 : max].id, start_time: birthday, end_time: deathday, detail: "TODO 123" },
        { user_id: dataArr[0 < max ? 0 : max].id, start_time: birthday, end_time: deathday, detail: "TODO 123" },
        { user_id: dataArr[1 < max ? 1 : max].id, start_time: birthday, end_time: deathday, detail: "TODO 123" },
        { user_id: dataArr[1 < max ? 1 : max].id, start_time: birthday, end_time: deathday, detail: "TODO 123" },
        { user_id: dataArr[1 < max ? 1 : max].id, start_time: birthday, end_time: deathday, detail: "TODO 123" },
        { user_id: dataArr[2 < max ? 2 : max].id, start_time: birthday, end_time: deathday, detail: "TODO 123" },
        { user_id: dataArr[2 < max ? 2 : max].id, start_time: birthday, end_time: deathday, detail: "TODO 123" },
        { user_id: dataArr[2 < max ? 2 : max].id, start_time: birthday, end_time: deathday, detail: "TODO 123" }
      ]);
    })
};
