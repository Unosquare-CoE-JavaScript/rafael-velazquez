# Postgres

## Installation

```bash
brew install postgres
brew services start postgresql@14
psql portgres
```

## Create database and assign permissions

```sql
CREATE DATABASE graphql;
CREATE USER rafa with PASSWORD 'pass';
GRANT all ON DATABASE graphql TO rafa;
```

# Prisma

## Installation

```bash
npm install prisma
npm prisma init
```

## Synchronize DB schema

```bash
npx prisma db push
npx prisma studio
```