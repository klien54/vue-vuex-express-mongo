const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const posts = require('./routes/api/posts');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/posts', posts)

app.listen(port, () => console.log(`Server starts with port: ${port}`));