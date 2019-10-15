const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());

connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/posts',require('./routes/posts'));
app.use('/api/users',require('./routes/users'));
app.use('/api/emails',require('./routes/emails'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))