# Westerloy

## Table of Contents

1. [Installing Dependencies](#1-installing-dependencies)
   - [Install npm Packages](#install-npm-packages)
   - [Generate Prisma Client](#generate-prisma-client)
2. [Starting and Stopping Docker Compose](#2-starting-and-stopping-docker-compose)
   - [Starting Docker Compose](#starting-docker-compose)
   - [Stopping Docker Compose](#stopping-docker-compose)
3. [Database Seeding for Development](#3-database-seeding-for-development)
   - [Reset the Database](#reset-the-database)
   - [Seed the Database](#seed-the-database)

## 1. Installing Dependencies

### Install npm Packages

First, ensure you have all necessary npm packages installed. Run the following command in the root of your project:

```sh
npm install
```

### Generate Prisma Client

After installing the npm packages, generate the Prisma client with the following command:

```sh
npx prisma generate
```

## 2. Starting and Stopping Docker Compose

To manage your project's Docker containers, use the following commands:

### Starting Docker Compose

Navigate to the root of your project directory where the `docker-compose.yml` file is located, and run:

```sh
docker compose up -d
```

This command will start all the services defined in the `docker-compose.yml` file in detached mode.

### Stopping Docker Compose

To stop the running Docker containers, use:

```sh
docker compose down
```

This command will stop and remove the containers, networks, and volumes created by `docker compose up`.

## 3. Database Seeding for Development

To reset and seed your database for development, follow these steps:

### Reset the Database

You can reset the database yourself to undo manual changes or `db push` experiments by running:

```sh
npx prisma migrate reset
```

**Warning:**

- `migrate reset` is a development command and should never be used in a production environment.

**This command:**

- Drops the database/schema if possible, or performs a soft reset if the environment does not allow deleting databases/schemas.
- Creates a new database/schema with the same name if the database/schema was dropped.
- Applies all migrations.
- Runs seed scripts.

> **⚠️ CAUTION:** This action will delete everything from your database and recreate it based on your current schema. Ensure you have backed up any necessary data before proceeding.

### Seed the Database

After resetting the database, seed it with dummy data using the following command:

```sh
npx prisma db seed
```

This command will insert predefined dummy data into your database and display all database objects in your development console for review.

[⬆️ Back to top](#westerloy)
