import Mongoose from 'mongoose';

//import User from './user';

const mongoose = () => {
	if (process.env.TEST_DATABASE_URL) {
		return Mongoose.connect(process.env.TEST_DATABASE_URL, { useNewUrlParser: true });
	}

	if (process.env.DATABASE_URL) {
		return Mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
	}
};

const models = {
	/* User */
};

export { mongoose };

export default models;
