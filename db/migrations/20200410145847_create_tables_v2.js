
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary()
      table.string("username").notNullable()
      table.string("password").notNullable()
      table.dateTime("creation_time").notNullable().defaultTo(knex.fn.now())
      table.string("email").notNullable()
      table.specificType("subscription", "TINYINT").notNullable().defaultTo(1)

      table.unique(["username", "email"])
    })

    .createTable("meetings", (table) => {
      table.increments("id").primary()
      table.integer("user_id").notNullable().unsigned()
      table.dateTime("start_time").notNullable()
      table.dateTime("end_time").notNullable()
      table.text("detail")
      table.json("contacts")

      table.foreign("user_id").references("users.id").onDelete("CASCADE")
    })

    .createTable("contacts", (table) => {
      table.increments("id").primary()
      table.integer("user_id").notNullable().unsigned()
      table.string("first_name").notNullable()
      table.string("last_name").notNullable()
      table.string("email").notNullable()

      table.foreign("user_id").references("users.id").onDelete("CASCADE")
    })
    .catch((error) => {
      console.log(error)
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("meetings")
    .dropTable("contacts")
    .dropTable("users")
    .catch((error) => {
      console.log(error)
    })
};
