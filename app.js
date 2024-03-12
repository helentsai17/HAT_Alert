const cron = require('node-cron');
const { ExcerciseDiaryAlert } = require('./src/ExcerciseDiaryAlert');
const express = require('express');
const PORT = process.env.PORT || 3467;


const app = express();

const date = new Date();
console.log(`This is console on ${date}`);
console.log('================================================');
// ExcerciseDiaryAlert();


const cronJobEeveryDay = cron.schedule('0 2 * * *', async () => {
  console.log('Running days');
  ExcerciseDiaryAlert();
});

cronJobEeveryDay.start();

const cronJobEveryWeek = cron.schedule('0 3 1 * *', async () => {
  console.log('Running weeks');
  ExcerciseDiaryAlert();
});

cronJobEveryWeek.start();

const cronJobEveryMonth = cron.schedule('0 4 * * 0', async () => {
  console.log('Running a month');
  ExcerciseDiaryAlert();
});

cronJobEveryMonth.start();

/**
 * Initialize Server
 */

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));