import Sequelize from 'sequelize';

const config = {
	database: process.env.TEST_DATABASE || process.env.DATABASE,
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
};

const sequelize = new Sequelize(config.database, config.username, config.password, {
	dialect: 'postgres',
	define: {
		underscored: true,
	},
});

const models = {
	User: sequelize.import('./user'),
};

Object.keys(models).forEach((modelName) => {
	if ('associate' in models[modelName]) {
		models[modelName].associate(models);
	}
});

export { sequelize };

export default models;
