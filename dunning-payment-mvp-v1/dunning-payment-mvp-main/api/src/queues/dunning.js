const { Queue, Worker } = require('bullmq');
const IORedis = require('ioredis');

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379');

const dunningQueue = new Queue('dunningQueue', { connection });

function createDunningWorker(processFn) {
  const worker = new Worker('dunningQueue', async job => {
    console.log('Processing dunning job', job.id, job.name, job.data);
    try {
      await processFn(job.data);
      return { ok: true };
    } catch (err) {
      console.error('Job failed', err);
      throw err;
    }
  }, { connection });
  return worker;
}

module.exports = { dunningQueue, createDunningWorker };