# westerloy

# Database

## Database seeding for dev experience

First you need to reset your database by using the following command:

`npx prisma migrate reset`

[!CAUTION]
**this will delete all of your database and recreate it following your schema.**

afterwards you need to use the following command to seed the dummy data:

`npx prisma db seed`

it will dump every database object to your dev console, so you can review the items.
