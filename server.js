const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');

app.use(cors());

connectDB();

app.use(express.json({ extended: false }));

app.use(express.static('./public'));

app.use('/api/posts',require('./routes/posts'));
app.use('/api/users',require('./routes/users'));
app.use('/api/image',require('./routes/image'));
app.use('/uploads',express.static('uploads'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))