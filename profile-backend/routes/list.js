const express = require('express');
const router = express.Router();
const { logInfo, logWarn, logError } = require('../utils/logger');

const ENABLE_LIST_API = process.env.ENABLE_LIST_API === 'true';

router.get('/', (req, res) => {
  if (!ENABLE_LIST_API) {
    logWarn('Attempt to access List-API while disabled');
    return res.status(403).json({ 
      message: "❌ Sorry, List-API is disabled" 
    });
  }

  logInfo('List-API accessed successfully');

  res.json({
    message: "📌 API Directory",
    availableEndpoints: {
      profile: {
        get: "/api/profile",
        put: "/api/profile"
      },
      experience: {
        getAll: "/api/experience",
        getOne: "/api/experience/:id",
        post: "/api/experience",
        put: "/api/experience/:id",
        delete: "/api/experience/:id"
      },
      articles: {
        getAll: "/api/articles",
        getOne: "/api/articles/:slug",
        post: "/api/articles",
        put: "/api/articles/:id",
        delete: "/api/articles/:id"
      },
      assets: {
        banners: "/api/assets/banners",
        logos: "/api/assets/logos"
      }
    }
  });
});

module.exports = router;
