import { dummyData } from '@/../prisma/dummy-data';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const amountEventEntries = 3;
const amountNewsEntries = 3;

async function main() {
  dummyData.seed(amountEventEntries, amountNewsEntries);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
