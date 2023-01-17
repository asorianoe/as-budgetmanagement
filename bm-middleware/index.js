const express = require('express');
const { server } = require('./src/config/config');
const oracle = require('./src/utils/oracle');
const app = express();
const cors = require('cors');
const cookies = require('cookie-parser');
const guard = require('./src/guard/Guard');

const freeRoutes = require('./src/routes/Free');
const secureRoutes = require('./src/routes/Secure');


app.use(cors({ origin: true, credentials: true }));
app.use(cookies());
app.use(express.json());

app.use(freeRoutes);
app.use(guard);
app.use(secureRoutes);

oracle
  .start()
  .then(() => {
    console.log(`Oracle database connected!`);
    app.listen(server.port, () => {
      console.log(`Server is running on port: ${server.port}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
