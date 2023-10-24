const { Post } = require('./models');
const express = require('express')
const z = require("zod");
const app = express()


app.use(require('body-parser').urlencoded({ extended: false }));

app.use(express.static('public'));

const postTemplate = (post) => {
  return `
    <div class="post">
      <h2>${post.emoji}</h2>
      <button class="is-danger button" hx-delete="/api/books/${post.id}" hx-target=".post" hx-confirm="Are you sure you want to delete this post?" hx-swap="outerHTML swap:1s">Delete</button>
    </div>
  `;
};



app.get('/', async (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.get('/api/posts', async (req, res) => {
  const posts = await Post.findAll();

  let htmlResponse = '<div class="posts">';
  posts.forEach(post => {
    htmlResponse += postTemplate(post);
  });
  htmlResponse += '</div>';
  res.send(htmlResponse);
});


app.delete('/api/books/:id', async (req, res) => {
  const { id } = req.params;
  await Post.destroy({ where: { id } });
  res.send(`<div class="notification is-danger"><h1>Post has been deleted</h1></div>`);
})


app.post('/api/books/new', async (req, res) => {

  const { emoji } = req.body;

  const mySchema = z.string().emoji({ message: "Contains non-emoji characters" }).max(3);

  const validation = mySchema.safeParse(emoji);


  if (validation.success) {
    const post = await Post.create({
      emoji,
    });

    let htmlResponse = ``;
    htmlResponse += postTemplate(post);
    res.send(htmlResponse);
  } else {
    const {
      issues: [{
        message
      }]
    } = validation.error;

    let errorResponse = `
      <div class="notification is-danger">
        <h1>Error</h1>
        <p>${message}</p>
      </div>
    `;

    res.send(errorResponse);
  }

});


// Add your routes and other middleware here
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
