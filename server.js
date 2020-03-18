
const database = require('./mysqlDatabase');
const PORT = 9999;

database.connect((err) => {
  if (err) {
    throw err;
  }

  const app = require('./app')(database);
  app.listen(PORT, () => console.log(`Running on : http://localhost:${PORT}`))
})
