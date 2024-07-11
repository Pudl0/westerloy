import { PrismaClient } from '@prisma/client';

export class DummyData {
  private Chance = require('chance');
  private chance = new this.Chance();
  private prisma = new PrismaClient();

  public async seed(amountEventEntries: number, amountNewsEntries: number) {
    this.seedEventEntries(amountEventEntries);
    this.seedNewsEntries(amountNewsEntries);

    return Promise.resolve();
  }

  private async seedEventEntries(amount: number) {
    for (let i = 0; i < amount; i++) {
      await this.prisma.eventEntries.create({
        data: {
          title: this.chance.word(),
          description: this.chance.sentence(),
          location: this.chance.address({ short_suffix: true }),
          timeOfEvent: this.chance.date({
            string: false,
            american: false,
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
          }),
          pictureLink: '/Muehlenhof.jpg',
        },
      });
    }
  }

  private async seedNewsEntries(amount: number) {
    for (let i = 0; i < amount; i++) {
      await this.prisma.newsEntries.create({
        data: {
          title: this.chance.word(),
          description: this.chance.paragraph({ sentences: 10 }),
          shortDescription: this.chance.sentence(),
          pictureLink: '',
        },
      });
    }
  }
}

export const dummyData = new DummyData();
