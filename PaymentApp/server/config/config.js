const PORT = process.env.PORT || 3000

const mongoUri = process.env.MONGO_URL

exports.port = PORT

exports.mongoUri = mongoUri

exports.TOKEN_SECRET= process.env.TOKEN_SECRET