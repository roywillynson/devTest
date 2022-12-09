const { Router } = require('express');
const bitmexController = require('../controllers/bitmex.controller');
const router = Router();

exports.routes = () => {
  router.get('/announcement', bitmexController.getAnnouncement);

  return router;
};
