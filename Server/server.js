const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const fs = require('fs');  // Required to initialise JSON for backend
const { response } = require('express');

const server = express()
server.use(cors());
server.use(bodyParser.text());

const port = 3000;

// Initilise posts, an array of objects with {title: "", body:"", image:"", comments: []} from external JSON File. 
const data = fs.readFileSync('data.JSON');
const posts = JSON.parse(data);


server.get('/', (req, res) => {
    res.send('Hello');
})

// Write get request that will send posts object to cleint side
server.get('/posts', (req, res) => res.send(JSON.stringify(posts)));

// Route Parameters

// server.get('/posts/:id', (req, res) => {
//     const postTitle = req.params.id;
    
// })

// Write post request that will add a users post to the posts variable and appends the JSON file
server.post('/posts', (req, res) => {
    const newPost = JSON.parse(req.body); 
    posts.push(newPost);
    let data = JSON.stringify(posts, null, 2);
    fs.writeFileSync('data.JSON', data) 
})

// Write get request for comments
server.get('/comments', (req, res) => res.send(JSON.stringify(posts)));

// Write post request that will add a comment to the comments variable and appends it to to the JSON file
server.post('/comments', (req, res) => {
    let newComment = req.body
    let i = newComment.slice(-2, -1);
    newComment = newComment.slice(1, -2);

    posts[i].comments.push(newComment);
    let data = JSON.stringify(posts, null, 2);
    fs.writeFileSync('data.JSON', data)

})


//Write get request for emojis
server.get('/emojis', (req, res) => res.send(JSON.stringify(posts)));

//Write a post request that will add an emoji reaction to a variable and update the json file
server.post('/emojis', (req, res) => {
    let newReaction = JSON.parse(req.body)
    console.log(newReaction);

    let i = newReaction[0];
    console.log(i);

    let reactionType = newReaction[1];
    console.log(reactionType);

    newValue = newReaction[2];
    console.log(newValue);

    posts[i][reactionType] = newValue

    let data = JSON.stringify(posts, null, 2);
    fs.writeFileSync('data.JSON', data)

})


server.listen(port, () => console.log(`We are live at http://localhost:${port}`));      