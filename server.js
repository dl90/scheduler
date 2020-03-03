
// const message = require('./database');
const message = require('./test/testDatabase');
const app = require('./app')(message);
const PORT = 9999;


app.listen(PORT, () => console.log(`Running on : http://localhost:${PORT}`))