const Router = require('express').Router

module.exports = Router({ mergeParams: true })
  .get('/v1/test/health', async (req, res) => {
    try {
      res.json({ test: 'healthy'});
    } catch (error) {
      next(error);
    }
  })