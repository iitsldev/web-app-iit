# Installation Steps

Make sure to download Node.js to your development environment. Migrated to NextJs 12. Process completed

## Using npm

Run commands

1. `npm install`
2. `npm run dev`

## Or using yarn

Run commands

1. `npm install --global yarn`
2. `yarn install`
3. `yarn run dev`

## config
Edit the database, s3,.. configuration from .env file
run `npm run kmigrate` to migrate the schema of database to database server.
run `npm run kseed` to pull the sample database from seed.js file.