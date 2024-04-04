/**
 * This script is responsible for reseting the SQL database.
 * Run it via `npm run db:reset:<environment>`.
 */
const models = require('../src/database/models');

console.log(`Reseting ${process.env.MIGRATION_ENV}...`);

models.sequelize
  .sync({ force: true })
  .then(() => {
    console.log('OK');
    process.exit();
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
