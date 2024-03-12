const cron = require('node-cron');
const { ExcerciseDiaryAlert } = require('./src/ExcerciseDiaryAlert');
const express = require('express');
const PORT = process.env.PORT || 3467;


const app = express();

const date = new Date();
console.log(`This is console on ${date}`);
console.log('================================================');
ExcerciseDiaryAlert();


// const cronJob = cron.schedule('0 2 * * *', async () => {
//   console.log('Running a task');
//   ExcerciseDiaryAlert();
// });

// cronJob.start();

/**
 * Initialize Server
 */

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));