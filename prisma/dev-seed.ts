import { dummyData } from '@/../prisma/dummy-data';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const amountEventEntries = 3;
const amountNewsEntries = 3;

async function main() {
  dummyData.seed(amountEventEntries, amountNewsEntries);
  // //These are the EventEntry dummy objects. Add oder edit them to your needs.
  // const testEvent1 = await prisma.eventEntries.upsert({
  //   where: { id: 0 },
  //   update: {},
  //   create: {
  //     title: 'TestEvent1',
  //     description: 'Dies ist eine Testbeschreibung',
  //     location: 'TestLocation',
  //     timeOfEvent: new Date(Date.now() + 86400000),
  //     pictureLink: '',
  //   },
  // });
  // const testEvent2 = await prisma.eventEntries.upsert({
  //   where: { id: 0 },
  //   update: {},
  //   create: {
  //     title: 'TestEvent2',
  //     description: 'Dies ist eine wesentlich längere Testbeschreibung, um die maximale Länge zu testen',
  //     location: 'TestLocation',
  //     timeOfEvent: new Date(Date.now() + 86400000 * 3),
  //     pictureLink: '',
  //   },
  // });
  // console.log({ testEvent1, testEvent2 });

  // //dummy newsEntry data. LoremIpsum constants should be change din the respextive constants-file to prevent this file from bloating up
  // const testNews1 = await prisma.newsEntries.upsert({
  //   where: { id: 0 },
  //   update: {},
  //   create: {
  //     title: 'Neue Testneuigkeiten',
  //     description: 'Hier wird der Nachrichtentext stehen.',
  //     shortDescription: 'Kurzbeschreibung für eine Nachricht.',
  //     pictureLink: '',
  //   },
  // });

  // const testNews2 = await prisma.newsEntries.upsert({
  //   where: { id: 0 },
  //   update: {},
  //   create: {
  //     title: 'Neue noch längere Testneuigkeiten',
  //     description: loremIpsum150,
  //     shortDescription: 'Kurzbeschreibung für eine längere Nachricht.',
  //     pictureLink: '',
  //   },
  // });
  // console.log(testNews1, testNews2);
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
