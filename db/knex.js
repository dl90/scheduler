require("dotenv").config();
const knex = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_pw,
    database: process.env.db_db
  }
});

knex.schema
  .createTable("user", (table) => {
    table.increments("id").primary()
    table.string("username").notNullable()
    table.string("password").notNullable()
    table.dateTime("creation_time").notNullable().defaultTo(knex.fn.now())
    table.string("email").notNullable()
    table.specificType("subscription", "TINYINT").notNullable().defaultTo(knex.Value())

    table.unique(["username", "email"])
  })
  .createTable("meetings", (table) => {
    table.increments("id").primary()
    table.integer("user_id").notNullable()
    table.dateTime("start_time").notNullable()
    table.dateTime("end_time").notNullable()
    table.text("detail")

    table.foreign("user_id").references("user.id").onDelete("CASCADE")
  })
  .createTable("contacts", (table) => {
    table.increments("id").primary()
    table.integer("user_id").notNullable()
    table.string("first_name").notNullable()
    table.string("last_name").notNullable()
    table.string("email").notNullable()

    table.foreign("user_id").references("user.id").onDelete("CASCADE")
  })


  .catch((error) => {
    console.log(error)
  })

module.exports = { knex }