
exports.seed = function (knex) {
  const userIdArr = [];
  const contactIdArr = [];

  // Deletes ALL existing entries
  return knex('meetings').del()
    .then(() => {
      return knex('users').select('id')
        .then(results => {
          results.forEach(value => {
            userIdArr.push(value)
          });
        });
    })
    .then(() => {
      return knex('contacts').select('id')
        .then(results => {
          results.forEach(value => {
            contactIdArr.push(value.id)
          })
        })
    })

    .then(function () {
      const userMax = userIdArr.length
      const contactMax = contactIdArr.length

      const birthday = new Date('December 1, 2020 03:20:00'),
        deathday = new Date('December 8, 2021 03:20:00');

      // Inserts seed entries
      // contacts: { "contact_ids": [1, 2] }'
      return knex('meetings').insert([
        { user_id: userIdArr[0 < userMax ? 0 : userMax].id, start_time: birthday, end_time: deathday, detail: "TODO 123", contacts: JSON.stringify({ contact_ids: [contactIdArr[0 < contactMax ? 0 : userMax], contactIdArr[1 < contactMax ? 1 : userMax], contactIdArr[2 < contactMax ? 2 : userMax]] }) },
        { user_id: userIdArr[0 < userMax ? 0 : userMax].id, start_time: birthday, end_time: deathday, detail: "TODO 123", contacts: JSON.stringify({ contact_ids: [contactIdArr[0 < contactMax ? 0 : userMax]] }) },
        { user_id: userIdArr[0 < userMax ? 0 : userMax].id, start_time: birthday, end_time: deathday, detail: "TODO 123", contacts: JSON.stringify({ contact_ids: [contactIdArr[0 < contactMax ? 0 : userMax]] }) },
        { user_id: userIdArr[1 < userMax ? 1 : userMax].id, start_time: birthday, end_time: deathday, detail: "TODO 123", contacts: JSON.stringify({ contact_ids: [contactIdArr[3 < contactMax ? 3 : userMax], contactIdArr[4 < contactMax ? 4 : userMax], contactIdArr[5 < contactMax ? 5 : userMax]] }) },
        { user_id: userIdArr[1 < userMax ? 1 : userMax].id, start_time: birthday, end_time: deathday, detail: "TODO 123", contacts: JSON.stringify({ contact_ids: [contactIdArr[3 < contactMax ? 3 : userMax]] }) },
        { user_id: userIdArr[1 < userMax ? 1 : userMax].id, start_time: birthday, end_time: deathday, detail: "TODO 123", contacts: JSON.stringify({ contact_ids: [contactIdArr[3 < contactMax ? 3 : userMax]] }) },
        { user_id: userIdArr[2 < userMax ? 2 : userMax].id, start_time: birthday, end_time: deathday, detail: "TODO 123", contacts: JSON.stringify({ contact_ids: [contactIdArr[6 < contactMax ? 6 : userMax], contactIdArr[7 < contactMax ? 7 : userMax], contactIdArr[8 < contactMax ? 8 : userMax]] }) },
        { user_id: userIdArr[2 < userMax ? 2 : userMax].id, start_time: birthday, end_time: deathday, detail: "TODO 123", contacts: JSON.stringify({ contact_ids: [contactIdArr[6 < contactMax ? 6 : userMax]] }) },
        { user_id: userIdArr[2 < userMax ? 2 : userMax].id, start_time: birthday, end_time: deathday, detail: "TODO 123", contacts: JSON.stringify({ contact_ids: [contactIdArr[6 < contactMax ? 6 : userMax]] }) }
      ]);
    })
};
