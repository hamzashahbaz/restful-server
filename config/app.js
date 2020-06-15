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
models.sequelize.sync({}).then(() => {
	app.listen({ port: process.env.PORT || 3000 }, () => console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 3000}`));
});
