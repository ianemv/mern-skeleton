import config from "./config/config.js";
import app from "./express.js";
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, 
	{ 
		// useCreateIndex: true,
		useUnifiedTopology: true,
		useNewUrlParser: true, 
	});
mongoose.connection.on("error", () => {
	throw new Error(`unable to connect to database: ${config.mongoUri}`);
});
app.get("/", (req, res) => {
	res.json({message: "Welcome"});
});
app.listen(config.port, (err) => {
	if (err) {
		console.log(err);
	}
	console.info("Server started on port %s.", config.port);
});

// const uri = "mongodb+srv://ianemv:<password>@cluster0.ftqlwdd.mongodb.net/?retryWrites=true&w=majority";
