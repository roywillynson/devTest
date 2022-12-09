const fetch = require('node-fetch');
const httpStatus = require('http-status');
const { config } = require('../config/env');

exports.getAnnouncement = async () => {
  const response = await fetch(`${config.apis.BITMEX}/announcement`, {
    withCredentials: true,
  });

  if (!response.ok) {
    const error = new Error(httpStatus[`${response.status}_MESSAGE`]);
    error.status = response.status;
    error.name = response.statusText;
    throw error;
  }

  const data = await response.json();

  return data;
};
