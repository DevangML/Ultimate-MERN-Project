const express = require('express');
const { authRouter, userRouter } = require('./routes/mernex.routes');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const mong = require('./databases/codine.dbs');
const logger = require('./logs/logger');
require('dotenv').config({ path: '.env' });
const compression = require('compression');
const app = express();

// Cors config

if ((process.env.NODE_ENV = 'development')) {
  app.use(cors({ origin: `http://localhost:3000` }));
}

// Compression

expressApp.use(compression());

// CORS Setup
const corsOptions = {
  origin: 'http://localhost:3000',
};
expressApp.use(cors(corsOptions));

// Basic express config
expressApp.use(express.json({ limit: '30mb', extended: true }));
expressApp.use(express.urlencoded({ limit: '30mb', extended: true }));
expressApp.use(helmet());

// Making database connection

mong();

// Routes
app.use('/auth', authRouter);
app.use('/user', userRouter);

// Static view configuration

// expressApp.use(express.static('view/build'));
// expressApp.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'view', 'build', 'index.html'));
//   logger.info('Static files i.e. client served');
// });

// Making Port and connection for express.js
const port = process.env.PORT || '5000';
const host = 'localhost';

expressApp.listen(port, () => {
  logger.info(`Server started and running on http://${host}:${port}`);
});
