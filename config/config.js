const config = {
	env: process.env.NODE_ENV || "development",
	port: process.env.PORT || 5001,
	jwtSecret: process.env.JWT_SECRET || "YOUR_secret",
	mongoUri: process.env.MONGODB_URI || "mongodb+srv://ianemv:*LhjAT9LPrDsYeL@cluster0.ftqlwdd.mongodb.net/Skeleton?retryWrites=true&w=majority"
};
export default config;