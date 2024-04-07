FROM node:20-alpine

WORKDIR /app

ENTRYPOINT ["/bin/sh", "-c", "npx prisma db push --force-reset" ]