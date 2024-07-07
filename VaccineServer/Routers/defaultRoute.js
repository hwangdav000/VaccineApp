let express = require('express');

// makes api case sensitive
let defaultRouter = express.Router({ caseSensitive: true });

defaultRouter.get('/', function (req, res) {
  res.send('Please specify valid endpoint');
});

module.exports = defaultRouter;
