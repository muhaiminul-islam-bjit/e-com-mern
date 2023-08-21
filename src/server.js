const app = require('./app');
const connectDB = require('./config/db');
require('dotenv').config();

const port = process.env.SERVER_PORT || 8080;

app.listen(port, async () => {
  console.log(`server is running at port ${port}`);

  await connectDB();
});
