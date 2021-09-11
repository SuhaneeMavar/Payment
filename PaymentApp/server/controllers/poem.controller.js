const Poem = require('../models/poem')
const mongoose=require('mongoose')
module.exports.addPoem = async (poem) => {
    return await Poem.create(poem)
}

module.exports.getPoemById = async (poemId) => {
    return await Poem.findOne({ _id: poemId })
}

module.exports.updatePoem = async (poemId, poem) => {
    return await Poem.updateOne({ _id: poemId }, {
        $set: {
            title: poem.title,
            poem: poem.poem
        }
    })
}

module.exports.deletePoem = async (poemId) => {
    console.log('id'+ poemId);
    return await Poem.deleteOne({ _id: poemId })
}

module.exports.getPoem = async (poemId) => {
    return await Poem.findOne({ _id: poemId }).populate('user')
}

module.exports.getAllPoems = async () => {
    return await Poem.find().populate('user')
}

module.exports.getPoemsByUser= async (userId) =>{
    return await Poem.find({'user':mongoose.Types.ObjectId(userId)}).populate('user')
}