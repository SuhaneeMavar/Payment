const PORT = process.env.PORT || 3000

const mongoUri = 'mongodb+srv://root:root@meanstack.it68f.mongodb.net/poetry?retryWrites=true&w=majority'

exports.port = PORT

exports.mongoUri = mongoUri

exports.TOKEN_SECRET='1e8e011ddc01915b70486484f2d3a829148208ead609449ff644e39ecc488fdff85211927757a4337df78aeb498ca95167ec1ab3d86ad1d5fb31db89cd6ceaa0'