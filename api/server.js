
// const message = require('./database');
const db = require('./test/testDatabase');
const app = require('./app')(db);
const PORT = 9999;

app.listen(PORT, () => console.log(`Running on : http://localhost:${PORT}`))