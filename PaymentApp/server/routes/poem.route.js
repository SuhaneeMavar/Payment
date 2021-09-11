const express = require('express')
const router = express.Router()
const Poem = require('../models/poem')
const poemCtrl = require('../controllers/poem.controller')
const { authenticate } = require('../middlewares/auth')

//create poem
router.post('/', authenticate, async (req, res) => {
    const poem = new Poem({
        user: req.body.user,
        title: req.body.title,
        poem: req.body.poem
    })

    try {
        const data = await poemCtrl.addPoem(poem)
        res.status(201).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).send('Error in creating post')
    }
})

//delete poem
router.delete('/:id', authenticate, async (req, res) => {
    console.log('hellop');
    const id = req.params.id
    try {
        const data = await poemCtrl.deletePoem(id)
        if (data.ok == 1)
            res.status(200).send({'message':'deleted successfully'})
    } catch (error) {
        console.log(error);
        res.status(500).send('Error in deleting post')
    }
})

//updating poem
router.patch('/:id', authenticate, async (req, res) => {
    const id = req.params.id
    const poem = new Poem({
        user: req.body.user,
        title: req.body.title,
        poem: req.body.poem
    })

    try {
        const data = await poemCtrl.updatePoem(id, poem)
        if (data.ok == 1)
            res.status(200).json({ 'message': 'updated successfully' })
    } catch (error) {
        console.log(error);
        res.status(500).send('Error in updating post')
    }
})


//getPoemByUser
router.get('/search', async (req, res) => {
    try {
        const data = await poemCtrl.getPoemsByUser(req.query.userId)
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
        res.status(500).send('Error in getting posts')
    }
})


//getPoemById
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const data = await poemCtrl.getPoem(id)
        console.log(data);
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send('Error in getting post')
    }
})


//getAllPoems
router.get('', async (req, res) => {
    try {
        const data = await poemCtrl.getAllPoems()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send('Error in getting post')
    }
})



module.exports = router