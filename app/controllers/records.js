var express = require('express'),
  router = express.Router(),
  request = require('request'),
  parseString = require('xml2js').parseString;

module.exports = function (app) {
  app.use('/records/', router);
};

router.get('/', function (req, res, next) {
  var records = [];

  request("https://hardwax.com/feeds/news/", function (requestError, response, body) {

    if (requestError || response.statusCode !== 200) {
      res.render('records', {
        title: 'Hardwax Rss Feed',
        error: requestError,
        code: response.statusCode
      });

      return;
    }

    parseString(body, function (xmlParseError, feed) {

      var items = feed.rss.channel[0].item;

      items.forEach(function (item) {

        Object.keys(item).map(function (key) {
          item[key] = item[key][0];
        });

        item.label = item.description.match(/<strong>(.+)<\/strong>/)[1];
        item.note = item.description.match(/<em>(.+)<\/em>/)[1];
        item.pubDate = new Date(item.pubDate);

        var imageMatch = item.description.match(/https:\/\/media.hardwax\.com[^"]+/);
        if (imageMatch.length > 0) {
          item.image = imageMatch[0];
        }
      });

      res.render('records', {
        title: 'Hardwax Rss Feed',
        records: items,
        error: xmlParseError
      });

    });
  });

});
