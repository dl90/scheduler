const dotenv = require("dotenv"),
  database = require("./db/mysqlDatabase"),
  result = dotenv.config();

if (result.error) {
  throw result.error;
} else {
  console.log(result.parsed);
}

database.connect(err => {
  if (err) {
    throw err;
  }
});

const app = require("./app")(database),
  PORT = process.env.port;
app.listen(PORT, () => console.log(`Running on : http://localhost:${PORT}`));
