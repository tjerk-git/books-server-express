const { Post } = require('./models');
const express = require('express')
const app = express()


app.use(express.static('public'));


app.get('/', async (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.get('/api/posts', async (req, res) => {
  const posts = await Post.findAll();

  let htmlResponse = '<div class="posts">';
  posts.forEach(post => {
    htmlResponse += `<h2>${post.title}</h2>`;
    htmlResponse += `<p>${post.body}</p>`;
  });
  htmlResponse += '</div>';
  res.send(htmlResponse);
});


// Add your routes and other middleware here
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
