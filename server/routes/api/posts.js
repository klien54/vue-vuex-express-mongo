const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

const mongoUrl = 'mongodb+srv://klien54:!qazxsw2@mycluster-qdxaw.mongodb.net/test?retryWrites=true&w=majority';

// Get posts
router.get('/', async (req, res) => {
    const post = await loadPostCollection();
    res.send(await post.find({}).toArray());
} );

// Add post
router.post('/', async (req, res) => {
    const posts = await loadPostCollection();
    const text = req.body.text;
    const post = await posts.insertOne({
        text,
        completed: false,
        created: new Date()
    });
    res.status(201).send(post.ops[0]);
});


// Delete post
router.delete('/:id', async(req, res) => {
    const posts = await loadPostCollection();
    const id = new mongodb.ObjectID(req.params.id);
    await posts.deleteOne({_id: id});
    res.status(200).send();
})


// Update post
router.put('/:id', async(req, res) => {
    const posts = await loadPostCollection();
    const id = new mongodb.ObjectID(req.params.id);
    const text = req.body.text;
    const completed = req.body.completed;
    await posts.updateOne({_id: id}, { $set: {text, completed}});
    res.status(200).send();
})


async function loadPostCollection() {
    const client = await mongodb.MongoClient.connect(mongoUrl, {
        useNewUrlParser: true
    });

    return client.db('vue_express').collection('posts');
}



module.exports = router;