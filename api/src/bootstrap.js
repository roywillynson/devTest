const { app } = require('./app.js');
const { config } = require('./config/env.js');
const db = require('./config/db.js');

async function bootstrap() {
  await db.connect();

  await app.listen(config.app.PORT, config.app.HOST, () => {
    console.log('Listening in port %s', config.app.PORT);
  });
}

bootstrap();
