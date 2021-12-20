var CronJob = require('cron').CronJob;

const getOffers = require('../api/index.js')

var job = new CronJob('* * * * *', getOffers, null, true, 'America/Los_Angeles');
job.start();