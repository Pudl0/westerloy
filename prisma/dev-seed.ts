import { dummyData } from '@/../prisma/dummy-data';

const amountEventEntries = 3;
const amountNewsEntries = 3;

dummyData.seed(amountEventEntries, amountNewsEntries).catch(async (e) => {
  console.error(e);
  process.exit(1);
});
