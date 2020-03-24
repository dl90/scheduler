const dotenv = require("dotenv");
const database = require("./mysqlDatabase");
const result = dotenv.config();

if (result.error) {
  throw result.error;
} else {
  console.log(result.parsed);
}
const PORT = process.env.port;

database.connect(err => {
  if (err) {
    throw err;
  }
});

const app = require("./app")(database);
app.listen(PORT, () => console.log(`Running on : http://localhost:${PORT}`));
