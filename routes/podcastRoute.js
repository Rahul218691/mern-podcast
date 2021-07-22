const router = require('express').Router();
const {topPodcast,podcastSearch,getPlayerurl} = require('../controllers/podcast');



router.get('/best_podcast/:country',topPodcast);
router.post('/search/:country',podcastSearch);
router.post('/feed',getPlayerurl);

module.exports = router;