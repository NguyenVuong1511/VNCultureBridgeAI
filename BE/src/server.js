const app = require('./app');
const { env } = require('./config/env');

app.listen(env.port, () => {
  console.log(`Backend is running on port ${env.port}`);
});
