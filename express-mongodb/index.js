import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import models from './models';
import routes from './routes';

// Express instance
const app = express();

// Environmental variables
dotenv.config();

// Enable CORS - Cross Origin Resource Sharing
app.use(cors());

// Parse body params and attach them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use(routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
	const error = newError('Not found');
	error.status = 404;
	next(error);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message,
		},
	});
});

// Listen to requests
models.mongoose().then(async () => {
	if (isTest || isProduction) {
		// reset database
		await Promise.all([models.User.deleteMany({}), models.Message.deleteMany({})]);

		createUsersWithMessages(new Date());
	}
	// Start the server
	app.listen(process.env.PORT, () => {
		console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
	});
});
