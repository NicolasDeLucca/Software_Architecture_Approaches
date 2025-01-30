import seedDatabaseSQL from './seeder';
const { sequelize } = require('../models');

const seedData = async () => {
  try {
     await sequelize.authenticate();
     console.log('Connection established successfully.');
     await seedDatabaseSQL().then(() => {
       console.log('Database seeded!');
    });
  } catch (error) {
      console.error('Error seeding:', error);
  } finally {
      await sequelize.close();
  }
};

export default seedData;