const dotenv = require('dotenv');
const path = require('path');

const dotenvOptions = process?.cwd()
  ? { debug: true }
  : { debug: true, path: path.resolve(__dirname, '../../.env') };

const result = dotenv.config(dotenvOptions);

if (result.error) {
  throw result.error;
}

const config = {
  utils: {
    isDev: process.env.NODE_ENV === 'development',
    isProd: process.env.NODE_ENV === 'production',
  },
  db: {
    mongo: {
      URI: process.env.MONGO_URI,
    },
  },
  app: {
    PORT: Number(process.env.APP_PORT) || 3000,
    HOST: process.env.APP_HOST || '0.0.0.0',
  },
  apis: {
    BITMEX: process.env.BASE_URL_BITMEX,
  },
  cors: {
    ALLOW_ORIGIN: process.env.CORS_ALLOW_ORIGIN,
  },
};

module.exports = {
  config,
};
